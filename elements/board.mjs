import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { createText } from './text.mjs';

export function CreateBoard(scene, position, _text, rotation, updateSizeCallback, updateCallback) {
   let updatesize;
   let text = _text.toString();
   let textgeo;
   let centerX;
   const board = new THREE.Group();
   let lesser;
   let lesserclicked = false;
   let more;
   let moreclicked = false;
   board.name = "board";

   function increase() {
      updateCallback(2);
   }

   function decrease() {
      updateCallback(-2);
   }

   function checkForButtonChange(controllerOne, controllerTwo) {
      if (controllerOne === undefined || controllerTwo === undefined) return;
      if (lesser === undefined || more === undefined) return;
   }

   function checkLesser() {

   }

   function checkMore() {

   }

   function rebuild() {

   }

   function createButtons() {
      const geo = new THREE.BoxGeometry(0.145, 0.495, 0.1);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      lesser = new THREE.Mesh(geo, mat);
      lesser.position.set(-0.420, 0, 0.01);
      board.add(lesser);
      const matOne = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      more = new THREE.Mesh(geo, matOne);
      more.position.set(0.420, 0, 0.01);
      board.add(more);
   }

   function createBase() {
      const geo = new THREE.BoxGeometry(1, 0.495, 0.1);
      const mat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
      const cube = new THREE.Mesh(geo, mat);
      geo.computeBoundingBox();
      const bounding = geo.boundingBox;
      centerX = (bounding.max.x + bounding.min.x) / 2;
      board.add(cube);
   }

   function createTextMesh() {
      console.log(text);
      textgeo = createText({ x: -0.25 / 2, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, text, 0x000000, 0.15, 0.06);
      textgeo.full.name = "size";
      board.add(textgeo.full);
      let textg = createText({ x: -0.25 / 2 - 0.125, y: -0.2, z: 0 }, { x: 0, y: 0, z: 0 }, "Maze-Size", 0x000000, 0.075, 0.06);
      board.add(textg.full);
   }

   function updateText(_text) {
      text = _text.toString();
      if (textgeo.full.children[0] instanceof THREE.Mesh) {
         textgeo.full.children[0].geometry.dispose();
         let textg = createText({ x: -0.25 / 2 + 0.025, y: -0.2, z: 0 }, { x: 0, y: 0, z: 0 }, "Size", 0x000000, 0.075, 0.1).full;
         console.log(textgeo.full.children[0].geometry);
         //textgeo.full.children[0].geometry = textg.children[0].geometry;
      }
   }

   createBase();
   createButtons();
   createTextMesh();
   board.position.set(position.x, position.y, position.z);
   scene.add(board);

   return { updateText, checkForButtonChange }
}