import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GenerateStartWalls } from './entrywalls.mjs'
import * as THREE from 'three';

const mazeX = -10, mazeY = -10, mazeZ = 0.05;
const boxsizexy = 1.6;
const boxsizez = 2.35;

export function GetMazeSimple() {
   const maze_one = [
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
   ]
   return maze_one;
}


export function GetMazeMedium() {
   const maze_one = [
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
   ]
   return maze_one;
}

export function generateMaze(rows, cols) {
   const maze = [];
   for (let i = 0; i < rows; i++) {
      maze[i] = [];
      for (let j = 0; j < cols; j++) {
         maze[i][j] = 1; // Initialize all cells as free
      }
   }

   const stack = [];
   const visited = {};

   const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols && !visited[`${x}-${y}`];

   const directions = [
      { dx: 0, dy: 2 },
      { dx: 2, dy: 0 },
      { dx: 0, dy: -2 },
      { dx: -2, dy: 0 },
   ];

   const carveMaze = (x, y) => {
      visited[`${x}-${y}`] = true;

      const shuffledDirections = directions.sort(() => Math.random() - 0.5);

      for (const dir of shuffledDirections) {
         const nx = x + dir.dx;
         const ny = y + dir.dy;

         if (isValid(nx, ny)) {
            maze[nx][ny] = 0; // Carve the wall
            maze[x + dir.dx / 2][y + dir.dy / 2] = 0; // Carve the path
            carveMaze(nx, ny);
         }
      }
   };

   carveMaze(0, 0);

   return maze;
};

export function generateMazeNew(size) {
   const maze = Array.from({ length: size * 2 + 1 }, () => Array(size * 2 + 1).fill(0));

   function recursiveBacktrack(x, y) {
      const directions = [
         { x: 0, y: 1 },  // Nach rechts
         { x: 1, y: 0 },  // Nach unten
         { x: 0, y: -1 }, // Nach links
         { x: -1, y: 0 }, // Nach oben
      ];

      maze[x][y] = 1;
      const shuffledDirections = directions.sort(() => Math.random() - 0.5);

      for (const { x: dx, y: dy } of shuffledDirections) {
         const nx = x + dx * 2, ny = y + dy * 2;
         if (nx > 0 && ny > 0 && nx < size * 2 && ny < size * 2 && maze[nx][ny] === 0) {
            maze[x + dx][y + dy] = 1; // Entferne die Wand zwischen den Zellen
            recursiveBacktrack(nx, ny);
         }
      }
   }

   // Starte von der oberen linken Ecke
   recursiveBacktrack(1, 1);

   // Füge den Eingang und Ausgang hinzu
   maze[0][1] = 1; // Eingang
   maze[size * 2][size * 2 - 1] = 1; // Ausgang

   return maze;
}

function printMaze(maze) {
   return maze.map(row => row.map(cell => cell === 0 ? '██' : '  ').join('')).join('\n');
}

export function GetMazeWithRandomExit(size) {
   const maze = Array.from({ length: size * 2 + 1 }, () => Array(size * 2 + 1).fill(0));

   function recursiveBacktrack(x, y) {
      const directions = [
         { x: 0, y: 1 },  // Nach rechts
         { x: 1, y: 0 },  // Nach unten
         { x: 0, y: -1 }, // Nach links
         { x: -1, y: 0 }, // Nach oben
      ];

      maze[x][y] = 1;
      const shuffledDirections = directions.sort(() => Math.random() - 0.5);

      for (const { x: dx, y: dy } of shuffledDirections) {
         const nx = x + dx * 2, ny = y + dy * 2;
         if (nx > 0 && ny > 0 && nx < size * 2 && ny < size * 2 && maze[nx][ny] === 0) {
            maze[x + dx][y + dy] = 1; // Entferne die Wand zwischen den Zellen
            recursiveBacktrack(nx, ny);
         }
      }
   }

   // Starte von der oberen linken Ecke
   recursiveBacktrack(1, 1);

   // Füge den Eingang hinzu
   maze[0][1] = 2; // Eingang

   // Füge einen zufälligen Ausgang hinzu
   let exitSide = Math.floor(Math.random() * 4); // Wähle eine Seite: 0=oben, 1=rechts, 2=unten, 3=links
   if (exitSide == 0) {
      exitSide = 2;
   }
   if (exitSide == 3) {
      exitSide = 1;
   }
   let exitX, exitY;
   console.log(exitSide);
   switch (exitSide) {
      case 0: // Oben
         exitX = 0;
         exitY = 2 * Math.floor(Math.random() * (size / 2)) + 1;
         break;
      case 1: // Rechts
         exitX = 2 * Math.floor(Math.random() * (size / 2)) + 1;
         exitY = size * 2;
         break;
      case 2: // Unten
         exitX = size * 2;
         exitY = 2 * Math.floor(Math.random() * (size / 2)) + 1;
         break;
      case 3: // Links
         exitX = 2 * Math.floor(Math.random() * (size / 2)) + 1;
         exitY = 0;
         break;
   }
   maze[exitX][exitY] = 3; // Ausgang
   const keyX = 2 * Math.floor(Math.random() * (size / 2)) + 1;
   const keyY = 2 * Math.floor(Math.random() * (size / 2)) + 1;
   maze[keyX][keyY] = 7; // Schlüssel

   return maze;
}

export function GenerateMazeStructure(scene, maze) {
   const texture = new THREE.TextureLoader().load('assets/beton/material.png');
   const floortexture = new THREE.TextureLoader().load('assets/beton/floor.png');
   const basicmaterial = new THREE.MeshBasicMaterial({ map: texture, color: 0xbbbbbb });
   const basicfloor = new THREE.MeshBasicMaterial({ map: floortexture, color: 0xbbbbbb });
   const loader = new GLTFLoader();
   let key;
   loader.load('./models/goldkey.glb', function (gltf) {
      key = gltf.scene;
      key.scale.set(0.65, 0.65, 0.65);
   }, undefined, function (error) {
      console.error("Could not load model key");
      console.error(error);
   });

   let mazegroup = new THREE.Group();
   mazegroup.name = "maze";
   let x = 0;
   let y = 0;
   GenerateStartWalls(scene);
   for (let row of maze) {
      for (let cell of row) {
         if (cell == 0) {
            const boxg = new THREE.BoxGeometry(boxsizexy, boxsizez, boxsizexy);
            const object = new THREE.Mesh(boxg, basicmaterial);
            object.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
            object.castShadow = true;
            mazegroup.add(object);
         }
         else if (cell == 1) {
            const boxg = new THREE.BoxGeometry(boxsizexy, 0.001, boxsizexy);
            const object = new THREE.Mesh(boxg, basicfloor);
            object.position.set((x * boxsizexy) + mazeX, -boxsizez / 2, (y * boxsizexy) + mazeY);
            object.castShadow = true;
            mazegroup.add(object);
         }
         else if (cell == 2) {
            const boxg = new THREE.BoxGeometry(boxsizexy / 2, boxsizez, boxsizexy);
            const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x33ff33 }))
            object.name = "entry";
            object.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
            object.castShadow = true;
            mazegroup.add(object);
         }
         else if (cell == 3) {
            if (x + 1 == row.length) {
               const boxg = new THREE.BoxGeometry(boxsizexy / 2, boxsizez, boxsizexy);
               const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x3333ff }))
               object.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
               object.castShadow = true;
               mazegroup.add(object);
            } else if (y + 1 == maze.length) {
               const boxg = new THREE.BoxGeometry(boxsizexy, boxsizez, boxsizexy / 2);
               const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x3333ff }))
               object.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
               object.castShadow = true;
               mazegroup.add(object);
            }
         }
         else if (cell == 7) {
            if (key) {
               key.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
               object.castShadow = true;
               mazegroup.add(key);
            } else {
               const boxg = new THREE.SphereGeometry(0.6, 16, 16);
               const object = new THREE.Mesh(boxg, new THREE.MeshStandardMaterial({ color: 0x7767ff }))
               object.position.set((x * boxsizexy) + mazeX, 0, (y * boxsizexy) + mazeY);
               object.castShadow = true;
               mazegroup.add(object);
            }
         }
         y++;
      }
      x++;
      y = 0;
   }
   mazegroup.position.set(0, boxsizez * 0.5, 0);
   scene.add(mazegroup);
}