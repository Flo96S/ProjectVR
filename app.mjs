import * as THREE from 'three';
import * as MAZE from './elements/maze.mjs';
import * as BACKEND from './elements/backend.mjs';
import * as USER from './elements/character.mjs';
import * as DEFAULT from './elements/scenesetup.mjs';
import * as OBJECTS from './elements/playobjects.mjs';
import * as TEXT from './elements/board.mjs';
import { MapItem } from './elements/map.mjs';
import { VRButton } from './jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as LEVER from './elements/button.mjs';

const MOVESCALE = 0.001;
let camerapos = { x: 0, y: 1.6, z: 0 };
let vr = false;
let experimental = false;
let playerStartPos = { x: 0, y: 0, z: 0 };
let camera = undefined;
let offset = { x: 15, y: 0, z: 10 };
//New scene
let scene = new THREE.Scene();
let totalmaze = new THREE.Group();

let lever = LEVER.CreateLever(totalmaze, () => { });

let skycam = false;

let renderer = new THREE.WebGLRenderer({
   antialias: true,
   alpha: false
});

document.addEventListener('keydown', (e) => {
   console.log(e.key);
   if (e.key == "ArrowLeft") {
      offset.x -= 0.5;
   } else if (e.key == "ArrowRight") {
      offset.x += 0.5;
   } else if (e.key == "ArrowUp") {
      offset.z -= 0.5;
   } else if (e.key == "ArrowDown") {
      offset.z += 0.5;
   } else if (e.key == "s") {
      lever.changeState();
   }
})


function updateVRCamera() {
   totalmaze.position.x = offset.x;
   totalmaze.position.y = offset.y;
   totalmaze.position.z = offset.z;
}

renderer.xr.addEventListener('sessionstart', () => {
   console.log("Start VR");
   if (camera === undefined) {
      renderer.xr.getCamera().position.set(1, 1.6, 1);
   } else {
      console.log("FOUND CAMERA");
   }
});


window.onload = function () {

   //Scene setup
   DEFAULT.GenerateScene(totalmaze);
   //Ground setup
   DEFAULT.GenerateFloor(totalmaze);
   //Maze setup
   let mazesize = 24; //Should be 48 max
   const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
   MAZE.GenerateMazeStructure(totalmaze, maze);

   const zeroposition = new THREE.BoxGeometry();
   const mat = new THREE.MeshBasicMaterial({ color: 0x880000 });
   const mesh = new THREE.Mesh(zeroposition, mat);
   scene.add(mesh);

   //Player
   let playerinfo = USER.CreatePlayer(scene, playerStartPos, { x: 0, y: 0, z: 0 }, renderer);
   //camera = playerinfo.camera;
   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.set(camerapos.x, camerapos.y, camerapos.z);
   scene.add(camera);
   scene.add(totalmaze);
   totalmaze.position.x = 15;
   totalmaze.position.z = 10;
   //Models
   //OBJECTS.Load(scene);
   let controls = new OrbitControls(camera, renderer.domElement);

   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;

   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.xr.enabled = true;

   document.body.appendChild(renderer.domElement);
   document.body.appendChild(VRButton.createButton(renderer));

   renderer.xr.getCamera().position.copy(camera.position);

   function render() {
      updateVRCamera();
      if (skycam) {
         camera.position.set(10, 50, 0);
         camera.rotation.set(-Math.PI / 2, 0, 0);
      }
      renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);
};