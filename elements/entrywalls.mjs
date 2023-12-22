import * as THREE from 'three';

let height = 0.35;
const posZ = 0.05;
let position = { x: 0, y: 0, z: 0 };

export function GenerateStartWalls(scene, _position) {
   const texture = new THREE.TextureLoader().load('assets/beton/material.png');
   const basicmaterial = new THREE.MeshBasicMaterial({ map: texture, color: 0xbbbbbb });
   let walls = new THREE.Group();
   position = _position;
   GenerateWallOne(walls, basicmaterial);
   GenerateWallTwo(walls, basicmaterial);
   GenerateWallThree(walls, basicmaterial);
   GenerateWallFour(walls, basicmaterial);
   walls.position.set(-0.001, height / 2, 0)
   scene.add(walls);
}

function GenerateWallOne(scene, mat) {
   const boxg = new THREE.BoxGeometry(2, height, 0.2);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(-2, 0, -1.25);
   scene.add(object);
}

function GenerateWallTwo(scene, mat) {
   const boxg = new THREE.BoxGeometry(2, height, 0.2);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(-2, 0, -3);
   scene.add(object);
}

function GenerateWallThree(scene, mat) {
   const boxg = new THREE.BoxGeometry(0.2, height, 1);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(-1, 0, -2.5);
   scene.add(object);
}

function GenerateWallFour(scene, mat) {
   const boxg = new THREE.BoxGeometry(0.2, height, 1.75);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(-3, 0, -2.1);
   scene.add(object);
}