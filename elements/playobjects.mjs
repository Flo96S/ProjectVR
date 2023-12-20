import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function Load(scene) {
   const loader = new GLTFLoader();

   loader.load('./models/headset.glb', function (gltf) {
      const obj = gltf.scene;
      obj.position.set(1, 1, 1);
      scene.add(obj);
   }, undefined, function (error) {
      console.error("could not load model");
   });
}