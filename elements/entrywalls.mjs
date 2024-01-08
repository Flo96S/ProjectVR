import * as THREE from 'three';

let height = 2.35;
let position = { x: -5, y: 0, z: 0 };

export function GenerateStartWalls(scene, _position) {
   const texture = new THREE.TextureLoader().load('assets/beton/material.png');
   const basicmaterial = new THREE.MeshStandardMaterial({ map: texture, color: 0xbbbbbb });
   let walls = new THREE.Group();
   position = _position;
   GenerateWallOne(walls, basicmaterial);
   GenerateWallTwo(walls, basicmaterial);
   GenerateWallThree(walls, basicmaterial);
   GenerateWallFour(walls, basicmaterial);
   walls.position.set(-15, height / 2, 0)
   scene.add(walls);
}

function GenerateWallOne(scene, mat) {
   const boxg = new THREE.BoxGeometry(10, height, 1.6);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(0, 0, -5);
   scene.add(object);
}

function GenerateWallTwo(scene, mat) {
   const boxg = new THREE.BoxGeometry(10, height, 1.6);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(0, 0, -15);
   scene.add(object);
}

function GenerateWallThree(scene, mat) {
   const boxg = new THREE.BoxGeometry(1.6, height, 5);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(5.001, 0, -13);
   scene.add(object);
}

function GenerateWallFour(scene, mat) {
   const boxg = new THREE.BoxGeometry(1.6, height, 10);
   const object = new THREE.Mesh(boxg, mat)
   object.position.set(-5, 0, -10);
   scene.add(object);
}