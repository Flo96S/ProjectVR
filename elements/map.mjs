import * as THREE from '../three.module.min.js';

let size = 0.5
let mazeX = 0;
let mazeY = 0;
export function MapItem(scene, _size, maze) {
   size = _size;
   mazeX = -size / 2;
   mazeY = -size / 2;
   GenerateBase(scene);
   GenerateWalls(scene, maze);
}

function GenerateBase(scene) {
   const boxg = new THREE.BoxGeometry(size + 0.025, 0.01, size + 0.025);
   const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0xff3333 }))
   object.position.set(0, 0, 0);
   scene.add(object);
}

function GenerateWalls(scene, maze) {
   let elsize = size / maze[0].length;
   let x = 0;
   let y = 0;
   for (let row of maze) {
      for (let cell of row) {
         if (cell == 0) {
            const boxg = new THREE.BoxGeometry(elsize, 0.011, elsize);
            const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x3333ff }))
            object.position.set((x * elsize) + mazeX, 0, (y * elsize) + mazeY);
            scene.add(object);
         }
         else if (cell == 2) {
            const boxg = new THREE.BoxGeometry(elsize, 0.011, elsize);
            const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x33ff33 }))
            object.position.set((x * elsize) + mazeX, 0, (y * elsize) + mazeY);
            scene.add(object);
         }
         else if (cell == 3) {
            const boxg = new THREE.BoxGeometry(elsize, 0.011, elsize);
            const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x3333ff }))
            object.position.set((x * elsize) + mazeX, 0, (y * elsize) + mazeY);
            scene.add(object);
         }
         y++;
      }
      x++;
      y = 0;
   }
}