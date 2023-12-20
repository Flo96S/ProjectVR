import * as THREE from 'three';

let height = 0.2;
const posZ = 0.05;
let position = { x: 0, y: 0, z: 0 };

export function GenerateStartWalls(scene, _position) {
   position = _position;
   GenerateWallOne(scene);
   GenerateWallTwo(scene);
   GenerateWallThree(scene);
   GenerateWallFour(scene);
}

function GenerateWallOne(scene) {
   const boxg = new THREE.BoxGeometry(2, height, 0.1);
   const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0xff3333 }))
   object.position.set(-2, posZ, -1.25);
   scene.add(object);
}

function GenerateWallTwo(scene) {
   const boxg = new THREE.BoxGeometry(2, height, 0.1);
   const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0xff3333 }))
   object.position.set(-2, posZ, -3);
   scene.add(object);
}

function GenerateWallThree(scene) {
   const boxg = new THREE.BoxGeometry(0.1, height, 1);
   const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0xff3333 }))
   object.position.set(-1, posZ, -2.5);
   scene.add(object);
}

function GenerateWallFour(scene) {
   const boxg = new THREE.BoxGeometry(0.1, height, 1.75);
   const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0xff3333 }))
   object.position.set(-3, posZ, -2.1);
   scene.add(object);
}