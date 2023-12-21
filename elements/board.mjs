import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export function CreateBoard(scene, position) {
   function createText(scene) {
      var loader = new FontLoader();
      loader.load('/assets/font/Arial.json', function (_font) {
         if (_font == undefined) {
            return;
         }
         const textGeometry = new TextGeometry('Hello', {
            font: _font,
            size: 20,
            height: 5,
            width: 5,
         });
         var textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
         var textMesh = new THREE.Mesh(textGeometry, textMaterial);
         textMesh.position.set(0, 2, 0);
         scene.add(textMesh);
      });
   }

   createText(scene);
}