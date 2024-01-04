import * as THREE from 'three';
import * as MAZE from './elements/maze.mjs';
import * as BACKEND from './elements/backend.mjs';
import * as USER from './elements/character.mjs';
import * as DEFAULT from './elements/scenesetup.mjs';
import * as OBJECTS from './elements/playobjects.mjs';
import { MapItem } from './elements/map.mjs';
import { VRButton } from './jsm/webxr/VRButton.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as LEVER from './elements/button.mjs';
import { createVRcontrollers } from './elements/controlls.mjs';
import { createTextSprite } from './elements/text.mjs';
import { CreateBoard } from './elements/board.mjs';

let movescale = 0.015;
let camerapos = { x: 0, y: 1.6, z: 0 };
let vr = false;
let camera = undefined;
let controllerOne, controllerTwo;
let offset = { x: 15, y: 0, z: 10 };
//New scene
let scene = new THREE.Scene();
let totalmaze = new THREE.Group();
let lever = LEVER.CreateLever(totalmaze, () => updateDoor());
let board;
let doorOpened = false;
let key = false;
let floormarker;
let xrsupported = false;
let mazesizeControll = 12;

let skycam = false;

let renderer = new THREE.WebGLRenderer({
   antialias: true,
   alpha: false,
});

const loader = new GLTFLoader();

loader.load('./models/center.glb', function (gltf) {
   floormarker = gltf.scene;
   floormarker.position.set(0, 0.001, 0);
   floormarker.scale.set(0.25, 0.25, 0.25);
   floormarker.rotation.set(0, Math.PI / 2, 0);
   scene.add(floormarker);
}, undefined, function (error) {
   console.error("could not load model");
});

//Pressed Buttons
let A = false;

//axes, buttons, hapticActuators
//ControllerOne = right
//buttons -> 0 -> pressed/touched/value -> Button Trigger
//buttons -> 1 -> pressed/touched/value -> Button Grip
//buttons -> 3 -> pressed/touched/value -> Button Stick Press
//buttons -> 4 -> pressed/touched/value -> Button A
//buttons -> 5 -> pressed/touched/value -> Button B

//buttons -> 4 -> pressed/touched/value -> Button X
//buttons -> 5 -> pressed/touched/value -> Button Y

function updateMovespeed(pressed) {
   if (pressed) {
      movescale = 0.025;
   } else {
      movescale = 0.015;
   }
}

function checkXRSession() {
   if ('xr' in navigator) {
      const button = VRButton.createButton(renderer);
      document.body.appendChild(button);
      xrsupported = true;
   }
}

function checkControllerButtons() {
   if (!vr) return;
   if (controllerOne === undefined) return;
   if (controllerTwo === undefined) return;
   if (controllerOne.gamepad === undefined) return;
   if (controllerTwo.gamepad === undefined) return;

   let aPressed = controllerOne.gamepad.buttons[4].pressed;
   let triggerPressedRight = controllerOne.gamepad.buttons[0].pressed;
   let triggerPressedLeft = controllerTwo.gamepad.buttons[0].pressed;
   let grippressedRight = controllerOne.gamepad.buttons[1].pressed;
   let grippressedLeft = controllerTwo.gamepad.buttons[1].pressed;
   console.log("GrippressedLeft" + grippressedLeft);
   //Interact
   if (!A && aPressed || !A && triggerPressedLeft || !A && triggerPressedRight) {
      A = true;
      lever.checkOverlapp(controllerOne, controllerTwo, offset);
      key = MAZE.ClickedKey(scene);
      console.log(key);
      if (key) {
         console.log("DELETE EVERYTHING");
         scene.getObjectByName("key").visible = false;
         scene.getObjectByName("keymesh").visible = false;
         scene.getObjectByName("exit").visible = false;
      }
   } else if (A && aPressed || A && triggerPressedLeft || A && triggerPressedRight) {

   } else {
      A = false;
   }

   if (grippressedLeft) {
      updateMovespeed(true);
   } else {
      updateMovespeed(false);
   }

   if (grippressedRight) {
      updateMovespeed(true);
   } else {
      updateMovespeed(false);
   }
}

function updateDoor() {
   let currentLeverState = lever.getState();
   if (currentLeverState != doorOpened) {
      doorOpened = currentLeverState;
      let door = scene.getObjectByName("entry", true);
      if (doorOpened) {
         door.visible = false;
      } else {
         door.visible = true;
      }
   }

   if (key) {
      let exitDoor = scene.getObjectByName("exit", true);
      console.log(exitDoor);
      if (exitDoor) {
         exitDoor.visible = false;
      }
   }
}

function rumble(controller, intensity, duration) {
   if (!vr) return;
   if (controller == "right") {
      if (controllerOne) {
         if (controllerOne.gamepad.hapticActuators && controllerOne.gamepad.hapticActuators.length > 0) {
            controllerOne.gamepad.hapticActuators[0].pulse(intensity, duration);
         }
      }
   } else if (controller == "left") {
      if (controllerTwo.gamepad.hapticActuators && controllerTwo.gamepad.hapticActuators.length > 0) {
         controllerTwo.gamepad.hapticActuators[0].pulse(intensity, duration);
      }
   }
}

function checkCollision() {
   let player = renderer.xr.getCamera();
   console.log(player.children[0]);
   const ray = new THREE.Ray(player.children[0].position, new THREE.Vector3(0, 0, -1));
   const intersects = ray.intersectsBox(scene.children.filter(obj => obj !== player))
   if (intersects.length > 0) {
      console.log("Collision");
   }
}

function updateVRCameraPosition() {
   if (!vr) return;
   if (!controllerOne) return;
   if (!controllerTwo) return;
   const coords = controllerTwo.gamepad.axes;
   const [nil, nol, horizontal, vertical] = coords;
   const movementDirection = new THREE.Vector3(horizontal, 0, vertical);
   const headsetRotation = new THREE.Quaternion();
   renderer.xr.getCamera().getWorldQuaternion(headsetRotation);
   movementDirection.applyQuaternion(headsetRotation);
   movementDirection.normalize();
   offset.x -= movementDirection.x * movescale;
   offset.z -= movementDirection.z * movescale;
   totalmaze.position.x = offset.x;
   totalmaze.position.y = offset.y;
   totalmaze.position.z = offset.z;
   //Update circle
   const cameraY = new THREE.Euler().setFromQuaternion(headsetRotation, 'YXZ');
   floormarker.rotation.y = cameraY.y;
}

renderer.xr.addEventListener('sessionstart', () => {
   if (camera === undefined) {
      camera = renderer.xr.getCamera();
      //renderer.xr.getCamera().position.set(1, 1.6, 1);
   } else {
      console.log("FOUND CAMERA");
      let { controller1, controller2 } = createVRcontrollers(scene, renderer, (controller, eventdata) => {
         if (eventdata.handedness == "right") {
            controllerOne = controller;
            controllerOne.gamepad = eventdata.gamepad;
            controllerOne.hand = eventdata.handedness;
            controllerOne.rumble = rumble;
         } else {
            controllerTwo = controller;
            controllerTwo.gamepad = eventdata.gamepad;
            controllerTwo.hand = eventdata.handedness;
            controllerTwo.rumble = rumble;
         }
      });
      vr = true;
   }
});

checkXRSession();

window.onload = function () {
   console.log(xrsupported);
   if (xrsupported) {
      board = CreateBoard(totalmaze, { x: -15, y: 1.4, z: -11 }, mazesizeControll, { x: 0, y: 0, z: 0 });
      totalmaze.name = "totalmaze";
      //Scene setup
      DEFAULT.GenerateScene(totalmaze);
      //Ground setup
      DEFAULT.GenerateFloor(totalmaze);
      //Maze setup
      let mazesize = 12;
      const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
      MAZE.GenerateMazeStructure(totalmaze, maze);
   } else {
      DEFAULT.GenerateScene(totalmaze);
      createTextSprite(totalmaze, { x: -21.5, y: 0, z: -18 }, { x: 0, y: 0, z: 0 }, 'Not supported', 0xff0000, 1.5, 0.2);
   }

   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.set(camerapos.x, camerapos.y, camerapos.z);
   scene.add(camera);
   scene.add(totalmaze);
   totalmaze.position.x = 15;
   totalmaze.position.z = 10;
   //Models
   //OBJECTS.Load(scene);
   //let controls = new OrbitControls(camera, renderer.domElement);
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;

   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.xr.enabled = true;

   document.body.appendChild(renderer.domElement);

   let num = 0;
   let x = 0;
   function render() {
      if (vr) {
         checkControllerButtons();
         updateVRCameraPosition();
         //checkCollision();
         board.checkForButtonChange(controllerOne, controllerTwo, offset);
         //Only check after some time
         if (num > 60) {
            MAZE.CheckSceneForKeyHover(scene, controllerOne, controllerTwo, offset);
            num = 0;
            x++;
         }
         if (x > 5) {
            x = 0;
            if (movescale > 0.015) {
               rumble('left', 0.1, 100);
               rumble('right', 0.1, 100);
            }
            //board.updateText("Hello");
         }
      }

      if (skycam) {
         camera.position.set(10, 30, 0);
         camera.rotation.set(-Math.PI / 2, 0, 0);
      }
      num++;
      renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);
};