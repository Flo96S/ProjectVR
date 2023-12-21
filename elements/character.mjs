import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function CreatePlayer(scene, _position, _rotation) {
   let height = 185;
   let position = _position;
   let rotation = { x: 0, y: 0, z: 0 };
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

   function initControllers() {

   }

   Init();
}