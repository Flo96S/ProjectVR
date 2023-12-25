import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function CreateLever(scene, _position, rotation, callback) {
   let toggled = false;
   const scale = 1;
   const position = _position;
   const pos = { x: -10.85, y: 1.5, z: -10 };

   function createLever() {
      //Load lever 3d model
      const loader = new GLTFLoader();
      loader.load('./models/leverclose.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.25, 0.25, 0.25);
         obj.rotation.set(Math.PI / 2, Math.PI * 2, Math.PI / 2);
         obj.position.set(pos.x, pos.y, pos.z);
         scene.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
   }

   function changeState() {
      if (toggled) {

      }
   }

   createLever();
}