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
//1m = 0.1

let renderer = new THREE.WebGLRenderer({
   antialias: true,
   alpha: false
});

let camerapos = { x: -1.75, y: 0.18, z: -2 };
let spawnArea = { xstart: -2, ystart: -2.1, xsize: 1.75, ysize: 1.5 };
let experimental = false;
let playerStartPos = { x: -2.5, y: 0, z: -2.5 };

function updateCamera() {

}


window.onload = function () {
   //New scene
   let scene = new THREE.Scene();

   let lever = LEVER.CreateLever(scene, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, () => { });
   //Scene setup
   let camera = DEFAULT.GenerateScene(scene);
   //Ground setup
   DEFAULT.GenerateFloor(scene);
   camera.position.set(2, 2, 2);
   camera.lookAt(1, 1, 1);
   //Maze setup
   let mazesize = 24; //Should be 48 max
   const maze = MAZE.GetMazeWithRandomExit(mazesize / 2);
   MAZE.GenerateMazeStructure(scene, maze);

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