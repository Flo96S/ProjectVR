import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createVRcontrollers } from './controlls.mjs';

export function CreatePlayer(scene, _position, _rotation, renderer) {
   let height = 185;
   let position = _position;
   let rotation = _rotation;
   let leftHandPosition = { x: 0, y: 0, z: 0 };
   let RightHandPosition = { x: 0, y: 0, z: 0 };
   let gotKey = -1;
   let controllerLeft = undefined;
   let controllerRight = undefined;
   let player = new THREE.Group();
   let color = '0xff0000';
   let camera = renderer.xr.getCamera();
   camera.position.set(5, 1.6, 5);
   scene.add(camera);

   function Update() {

   }

   function LoadHeadset() {
      const loader = new GLTFLoader();
      loader.load('./models/headset.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.5, 0.5, 0.5);
         obj.position.set(0, height / 100, 0);
         player.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
   }

   function LoadBody() {
      const loader = new GLTFLoader();
      loader.load('./models/body.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.65, 1, 0.6);
         obj.position.set(0, (height / 2000) - 0.1, 0);
         player.add(obj);
      }, undefined, function (error) {
         console.error("Could not load model");
      })
   }

   function Init() {
      createPlayer();
      //Create controller left
      controllerLeft, controllerRight = createVRcontrollers(scene, renderer, () => { });
   }

   function createPlayer() {
      const headset = LoadHeadset();
      LoadBody();
      player.matrixAutoUpdate = false;
      player.position.set(position.x, position.y, position.z);
      player.updateMatrix();
      scene.add(player);
   }

   function updatePosition(_position) {
      position = _position;
      camera.position.set(_position.x, _position.y, _position.z)
   }

   function getPosition() {
      return position;
   }

   function initControllers() {

   }

   Init();

   return { camera, updatePosition, getPosition };
}