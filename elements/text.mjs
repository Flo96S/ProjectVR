import { Font } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as FONT from 'three/addons/loaders/TTFLoader.js';
import * as THREE from 'three';

export function DegreeToRadian(degree) {
   return degree * (Math.PI / 180);
}

export function createTextSprite(scene, position, rotation, text, color, size, height, debug) {
   const full = new THREE.Group();
   let font = null;
   const loader = new FONT.TTFLoader();
   loader.load('./assets/font/ARIAL.TTF', function (json) {
      font = new Font(json)
      const textGeo = new TextGeometry(text, {
         font: font,
         size: size,
         height: height,
         bevelEnabled: false
      });
      textGeo.computeBoundingBox();
      const bounding = textGeo.boundingBox;
      const centerX = (bounding.max.x + bounding.min.x) / 2;
      const centerY = (bounding.max.y + bounding.min.y) / 2;
      const centerZ = (bounding.max.z + bounding.min.z) / 2;
      const mesh = new THREE.Mesh(textGeo, new THREE.MeshStandardMaterial({ color: color }));

      if (debug) {
         const shere = new THREE.SphereGeometry(size / 2, 8, 8);
         const spmesh = new THREE.Mesh(shere, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
         spmesh.position.set(centerX, centerY, centerZ);
         full.add(spmesh);
      }
      mesh.rotation.set(DegreeToRadian(rotation.x), DegreeToRadian(rotation.y), DegreeToRadian(rotation.z));
      full.add(mesh);
      full.position.set(position.x, position.y, position.z);
      scene.add(full);
      return full;
   });
}

export function createText(position, rotation, text, color, size, height, debug) {
   const full = new THREE.Group();
   let centerX = 0;
   let font = null;
   const loader = new FONT.TTFLoader();
   loader.load('./assets/font/ARIAL.TTF', function (json) {
      font = new Font(json)
      const textGeo = new TextGeometry(text, {
         font: font,
         size: size,
         height: height,
         bevelEnabled: false
      });
      textGeo.computeBoundingBox();
      const bounding = textGeo.boundingBox;
      centerX = (bounding.max.x + bounding.min.x) / 2;
      const centerY = (bounding.max.y + bounding.min.y) / 2;
      const centerZ = (bounding.max.z + bounding.min.z) / 2;
      const mesh = new THREE.Mesh(textGeo, new THREE.MeshStandardMaterial({ color: color }));

      if (debug) {
         const shere = new THREE.SphereGeometry(size / 2, 8, 8);
         const spmesh = new THREE.Mesh(shere, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
         spmesh.position.set(centerX, centerY, centerZ);
         full.add(spmesh);
      }
      mesh.rotation.set(DegreeToRadian(rotation.x), DegreeToRadian(rotation.y), DegreeToRadian(rotation.z));
      full.add(mesh);
      full.position.set(position.x, position.y, position.z);
   });
   return { full, centerX };
}