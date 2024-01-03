import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { createText } from './text.mjs';

export function CreateBoard(scene, position, _text, rotation) {
   let text = _text;
   let textgeo;
   let centerX;
   const board = new THREE.Group();

   function createButtons() {
      const geo = new THREE.BoxGeometry(0.15, 0.5, 0.1);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geo, mat);
      cube.position.set(-0.425, 0, 0.01);
      board.add(cube);
      const matOne = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cubeOne = new THREE.Mesh(geo, matOne);
      cubeOne.position.set(0.425, 0, 0.01);
      board.add(cubeOne);
   }

   function createBase() {
      const geo = new THREE.BoxGeometry(1, 0.5, 0.1);
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      const cube = new THREE.Mesh(geo, mat);
      geo.computeBoundingBox();
      const bounding = geo.boundingBox;
      centerX = (bounding.max.x + bounding.min.x) / 2;
      console.log(bounding);
      board.add(cube);
   }

   function createTextMesh() {
      textgeo = createText({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, "0", 0x000000, 0.15, 0.1);
      textgeo.full.position.set(centerX - textgeo.centerX, 0, 0);
      board.add(textgeo.full);
   }

   function updateText(_text) {
      text = _text;
   }

   createBase();
   createButtons();
   createTextMesh();
   board.position.set(position.x, position.y, position.z);
   scene.add(board);
}