import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createVRcontrollers } from './controlls.mjs';

export function CreatePlayer(scene, _position, _rotation) {
   let height = 185;
   let position = _position;
   let rotation = _rotation;
   let leftHandPosition = { x: 0, y: 0, z: 0 };
   let RightHandPosition = { x: 0, y: 0, z: 0 };
   let BagLeft = -1;
   let BagRight = -1;
   let HandLeft = -1;
   let HandRight = -1;
   let controllerLeft = undefined;
   let controllerRight = undefined;
   let player = new THREE.Group();
   let color = '0xff0000';
   let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
   scene.add(camera);

   function Update() {

   }

   function LoadHeadset() {
      const loader = new GLTFLoader();
      loader.load('./models/headset.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.05, 0.05, 0.05);
         obj.position.set(0, height / 1000, 0);
         player.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
   }

   function LoadBody() {
      const loader = new GLTFLoader();
      loader.load('./models/body.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.075, 0.1, 0.05);
         obj.position.set(0, (height / 2000) - 0.1, 0);
         player.add(obj);
      }, undefined, function (error) {
         console.error("Could not load model");
      })
   }

   function Init() {
      createPlayer();
      //Create controller left
      controllerLeft, controllerRight = createVRcontrollers(scene,);
   }

   function createPlayer() {
      const headset = LoadHeadset();
      const body = LoadBody();
      player.matrixAutoUpdate = false;
      player.position.set(position.x, position.y, position.z);
      player.updateMatrix();
      if (headset != undefined) {
         console.log("Added headset");
         player.add(headset);
      }
      scene.add(player);
   }

   function updatePosition(x, y, z) {
      camera.position.set(x, y, z)
   }

   function initControllers() {

   }

   Init();

   return { camera, updatePosition };
}