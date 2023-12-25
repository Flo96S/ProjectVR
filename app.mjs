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
//1.6 = 1.6m
let renderer = new THREE.WebGLRenderer({
   antialias: true,
   alpha: false
});

const MOVESCALE = 0.001;
let camerapos = { x: -1.75, y: 1.6, z: -2 };
let spawnArea = { xstart: -2, ystart: -2.1, xsize: 1.75, ysize: 1.5 };
let vr = false;
let experimental = false;
let playerStartPos = { x: -14.7, y: 0, z: -9.615 };
let camera = undefined;

function updateCamera() {

}

renderer.xr.addEventListener('sessionstart', () => {
   if (camera == undefined) {
      renderer.xr.getCamera.position.set(1, 1.6, 1);
   } else {
      renderer.xr.getCamera().position.copy(camera);
   }
});


window.onload = function () {
   //New scene
   let scene = new THREE.Scene();

   let lever = LEVER.CreateLever(scene, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, () => { });
   //Scene setup
   DEFAULT.GenerateScene(scene);
   //Ground setup
   DEFAULT.GenerateFloor(scene);
   //Maze setup
   let mazesize = 24; //Should be 48 max
   const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
   MAZE.GenerateMazeStructure(scene, maze);

   //Player
   let playerinfo = USER.CreatePlayer(scene, playerStartPos, { x: 0, y: 0, z: 0 }, renderer);
   //camera = playerinfo.camera;
   let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.set(camerapos.x, camerapos.y, camerapos.z);
   scene.add(camera);
   //Models
   //OBJECTS.Load(scene);
   //let controls = new OrbitControls(camera, renderer.domElement);

   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;

   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.xr.enabled = true;

   document.body.appendChild(renderer.domElement);
   document.body.appendChild(VRButton.createButton(renderer));

   let first = true;
   renderer.xr.getCamera().position.copy(camera.position);

   function render() {
      playerinfo.updatePosition(camerapos.x, camerapos.y, camerapos.z);
      console.log(camera.position);
      if (first) {
         first = false;
      }
      camera.position.set(-21, 16.4, -11.76);
      renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);
};