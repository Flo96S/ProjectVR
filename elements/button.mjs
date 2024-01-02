import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function CreateLever(scene, callback) {
   let toggled = false;
   const pos = { x: -10.85, y: 1.4, z: -10 };
   let boundingBox;
   const listener = new THREE.AudioListener();
   const sound = new THREE.Audio(listener);
   const audioLoader = new THREE.AudioLoader();
   audioLoader.load('./assets/sound/lever.ogg', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.5);
   });

   function createLever() {
      let box = new THREE.Group();
      const loader = new GLTFLoader();
      loader.load('./models/leverclose.glb', function (gltf) {
         let obj = gltf.scene;
         obj.scale.set(0.25, 0.25, 0.25);
         obj.rotation.set(Math.PI / 2, Math.PI * 2, Math.PI / 2);
         obj.name = "lever";
         obj.position.set(pos.x, pos.y, pos.z);
         boundingBox = new THREE.Box3().setFromObject(obj);
         let boundingBoxHelper = new THREE.Box3Helper(boundingBox, 0xffff00);
         scene.add(boundingBoxHelper);
         scene.add(obj);
      }, undefined, function (error) {
         console.error("could not load model");
      });
      scene.add(box);
   }

   function getState() {
      return toggled;
   }

   function changeState() {
      let found = -1;
      let index = 0;
      sound.play();
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
      callback();
   }

   function checkOverlapp(controllerOne, controllerTwo, worldoffset) {
      let overlapp = false;
      const x = boundingBox.clone().translate(worldoffset);
      if (controllerOne.position.x >= x.min.x && controllerOne.position.x <= x.max.x) {
         if (controllerOne.position.y >= x.min.y && controllerOne.position.y <= x.max.y) {
            if (controllerOne.position.z >= x.min.z && controllerOne.position.z <= x.max.z) {
               changeState();
               controllerOne.rumble("right", 0.75, 500);
               overlapp = true;
            }
         }
      }
      if (controllerTwo.position.x >= x.min.x && controllerTwo.position.x <= x.max.x) {
         if (controllerTwo.position.y >= x.min.y && controllerTwo.position.y <= x.max.y) {
            if (controllerTwo.position.z >= x.min.z && controllerTwo.position.z <= x.max.z) {
               changeState();
               controllerOne.rumble("left", 0.75, 500);
               overlapp = overlapp || true;
            }
         }
      }
      return overlapp;
   }

   createLever();

   return { changeState, checkOverlapp, getState }
}