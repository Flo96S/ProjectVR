import * as THREE from 'three';
import * as MAZE from './elements/maze.mjs';
import { MapItem } from './elements/map.mjs';
import * as BACKEND from './elements/backend.mjs';
import * as USER from './elements/character.mjs';
import * as DEFAULT from './elements/scenesetup.mjs';
import * as OBJECTS from './elements/playobjects.mjs';
import { VRButton } from './jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//1m = 0.1

let camerapos = { x: -1.75, y: 0.18, z: -2 };
let spawnArea = { xstart: -2, ystart: -2.1, xsize: 1.75, ysize: 1.5 };
let experimental = false;
let playerStartPos = { x: -1.9, y: 0, z: -2 };


window.onload = function () {
   let renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
   });

   //New scene
   let scene = new THREE.Scene();

   //Scene setup
   let camera = DEFAULT.GenerateScene(scene);
   //Ground setup
   DEFAULT.GenerateFloor(scene);
   camera.position.set(2, 2, 2);
   camera.lookAt(1, 1, 1);
   //Maze setup
   let mazesize = 24; //Should be 48 max
   const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
   //MAZE.GenerateMazeStructure(scene, maze);

   //Player
   let char = USER.CreatePlayer(scene, playerStartPos, 0);

   //Models
   //OBJECTS.Load(scene);

   const controls = new OrbitControls(camera, renderer.domElement);

   const MOVESCALE = 0.001;

   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;

   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.xr.enabled = true;

   document.body.appendChild(renderer.domElement);
   document.body.appendChild(VRButton.createButton(renderer));

   controls.update();

   function render() {
      controls.update();
      renderer.render(scene, camera);
   }
   renderer.setAnimationLoop(render);
};