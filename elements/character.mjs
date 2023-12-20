import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function CreatePlayer(scene, _position, _rotation) {
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

   function LoadHeadset() {
      let obj = undefined;
      const loader = new GLTFLoader();
      loader.load('./models/headset.glb', function (gltf) {
         obj = gltf.scene;
         //obj.position.set(position.x, 1, position.z);
         obj.scale.set(0.15, 0.15, 0.15);
         obj.position.set(0, 0.18, 0);
         player.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
   }

   function createPlayer() {
      const headset = LoadHeadset();
      player.matrixAutoUpdate = false;
      player.updateMatrix();
      player.position.set(position.x, position.y, position.z);
      if (headset != undefined) {
         console.log("Added headset");
         player.add(headset);
      }
      const body = new THREE.BoxGeometry(0.25, 0.15, 0.25);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(body, material);
      player.add(cube);
      scene.add(player);
   }

   function getController() {
      const controllerModelFactory = new XRControllerModelFactory();

      function getController(id) {
         let controller = renderer.xr.getController(id);
         controller.addEventListener('selectstart', () => {
            console.log(`Controller ${id} selects`);
            controller.userData.isSelecting = true;
         });
         controller.addEventListener('selectend', () => {
            console.log(`Controller ${id} select ends`);
            controller.userData.isSelecting = false;
         });
         controller.addEventListener('squeezestart', () => {
            console.log(`Controller ${id} squeezes`);
            controller.userData.isSqueezeing = true;
         });
         controller.addEventListener('squeezeend', () => {
            console.log(`Controller ${id} squeeze ends`);
            controller.userData.isSqueezeing = false;
         });
         controller.addEventListener('connected', function (event) {
            console.log(`controller connects ${id} mode ${event.data.targetRayMode} ${event.data.handedness} hand`);
            // inform app that we have a controller
            connect_cb(controller, event.data);
         });
         controller.addEventListener('disconnected', () => {
            controller.remove(controller.children[0]);
            console.log(`controller disconnects ${id} `);
         });

         scene.add(controller);

         let controllerGrip = renderer.xr.getControllerGrip(id);
         controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
         scene.add(controllerGrip);
         return { controller, controllerGrip };
      }
      let controller1 = getController(0);
      let controller2 = getController(1);

      return { controller1, controller2 };
   }

   createPlayer();
}