import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function CreateLever(scene, callback) {
   let toggled = false;
   const pos = { x: -10.85, y: 1.4, z: -10 };

   function createLever() {
      //Load lever 3d model
      const loader = new GLTFLoader();
      loader.load('./models/leverclose.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.25, 0.25, 0.25);
         obj.rotation.set(Math.PI / 2, Math.PI * 2, Math.PI / 2);
         obj.position.set(pos.x, pos.y, pos.z);
         obj.name = "lever";
         scene.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
   }

   function changeState() {
      let found = -1;
      let index = 0;
      for (const lever of scene.children) {
         if (lever.name == "lever") {
            found = index;
            break;
         }
         index++;
      }
      scene.children.splice(found, 1);

      toggled = !toggled;
      if (toggled) {
         const loader = new GLTFLoader();
         loader.load('./models/leveropen.glb', function (gltf) {
            let obj = gltf.scene;
            obj.scale.set(0.25, 0.25, 0.25);
            obj.rotation.set(Math.PI / 2, Math.PI * 2, Math.PI / 2);
            obj.position.set(pos.x, pos.y, pos.z);
            scene.add(obj);
         }, undefined, function (error) {
            console.error("could not load model");
         });
      } else {
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
   }

   createLever();

   return { changeState }
}