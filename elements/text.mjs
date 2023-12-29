import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as THREE from 'three';

export function createText(scene) {
   var loader = new FontLoader();
   loader.load('../assets/font/Arial.json', function (_font) {
      var textGeo = new TextGeometry('Hello', {
         font: _font,
      });
      var textmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      var mesh = new THREE.Mesh(textGeo, textmaterial);
      mesh.position.set(-15, 5, -25);
      scene.add(mesh);
   });
}