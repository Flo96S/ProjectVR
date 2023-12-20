import * as THREE from './three.module.min.js';
import { CreateSky } from './elements/sky.mjs';
import * as MAZE from './elements/maze.mjs';
import { MapItem } from './elements/map.mjs'
import * as BACKEND from './elements/backend.mjs'
console.log("ThreeJs " + THREE.REVISION);

let camerapos = { x: 0, y: 10, z: 0 };


window.onload = function () {
   let scene = new THREE.Scene();

   scene.add(new THREE.HemisphereLight(0x808080, 0x606060));
   let light = new THREE.DirectionalLight(0xffffff);
   light.position.set(0, 6, 0);
   light.castShadow = true;
   scene.add(light);
   CreateSky(scene);
   let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

   camera.lookAt(0, 0, 0);
   scene.add(camera);

   console.log("Init backend");
   const mze = BACKEND.GetRandomMazeFromServer();
   console.log("Finished backend call");
   let mazesize = 24; //Should be 48 max
   const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
   MAZE.GenerateMazeStructure(scene, maze);

   function randomMaterial() {
      return new THREE.MeshStandardMaterial({
         color: Math.random() * 0xff3333,
         roughness: 0.7,
         metalness: 0.0
      });
   }

   function add(i, parent, x = 0, y = 0, z = 0) {
      const object = new THREE.Mesh(geometries[i], randomMaterial());
      object.position.set(x, y, z);
      object.castShadow = true;
      parent.add(object);
      return object;
   }

   let mouseButtons = [false, false, false, false];

   let position = new THREE.Vector3();
   let rotation = new THREE.Quaternion();
   let scale = new THREE.Vector3();
   let direction = new THREE.Vector3();

   function keyboard() {
      let keys = {};

      function toggle(event, active) {
         if (keys[event.key]) {
            let ko = keys[event.key];
            if (ko.active !== active) {
               ko.active = active;
               ko.callback(active);
            }
         } else {
            console.log("undefined key", event.key);
         }
      }

      document.addEventListener("keydown", (ev) => toggle(ev, true));
      document.addEventListener("keyup", (ev) => toggle(ev, false));

      return function (key, callback) {
         keys[key] = {
            active: false,
            callback
         }
      }
   }

   const addKey = keyboard();
   addKey("Escape", active => {
      console.log("Escape", active);
   })

   addKey("ArrowRight", active => {
      if (active) {
         camerapos.x += 1;
      }
   })

   addKey("ArrowLeft", active => {
      if (active) {
         camerapos.x -= 1;
      }
   });

   addKey("ArrowUp", active => {
      if (active) {
         camerapos.z -= 1;
      }
   })

   addKey("ArrowDown", active => {
      if (active) {
         camerapos.z += 1;
      }
   });

   addKey("Shift", active => {
      if (active) {
         camerapos.y += 1;
      }
   })

   addKey("Control", active => {
      if (active) {
         camerapos.y -= 1;
      }
   })

   function toggle(ev, active) {
      mouseButtons[ev.which] = active;
      console.log(mouseButtons);
      if (ev.which === 2 && active) {
         shootBall();
      }
   }

   const MOVESCALE = 0.001;

   function onMouseMove(event) {
      const dx = event.movementX * MOVESCALE;
      const dy = event.movementY * MOVESCALE;
      const isRotation = event.ctrlKey;
      if (!isRotation && mouseButtons[1]) {
         cursor.position.x += dx;
         cursor.position.z += dy;
      }
      if (!isRotation && mouseButtons[3]) {
         cursor.position.x += dx;
         cursor.position.y += -dy;
      }

      if (isRotation && mouseButtons[1]) {
         cursor.rotation.x += dy;
         cursor.rotation.z += dx;
      }

   }

   const groundGeo = new THREE.PlaneGeometry(20, 20, 64);
   const groundMat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
   const ground = new THREE.Mesh(groundGeo, groundMat);
   ground.position.set(0, -0.050, -1);
   ground.receiveShadow = true;

   scene.add(ground);
   ground.rotation.x = -Math.PI / 2;

   let renderer = new THREE.WebGLRenderer({
      antialias: true,
   });

   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;

   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);

   document.body.appendChild(renderer.domElement);
   function render() {
      camera.position.x = camerapos.x;
      camera.position.y = camerapos.y;
      camera.position.z = camerapos.z;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);


};