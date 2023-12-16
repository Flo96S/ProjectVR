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
   const exitSide = Math.floor(Math.random() * 4); // Wähle eine Seite: 0=oben, 1=rechts, 2=unten, 3=links
   let exitX, exitY;
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

   return maze;
}