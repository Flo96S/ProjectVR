package maze

import (
	"fmt"
	"math/rand"
	"time"
)

type Cell struct {
	X, Y int
}

var directions = []Cell{
	{X: 0, Y: 1},
	{X: 1, Y: 0},
	{X: 0, Y: -1},
	{X: -1, Y: 0},
}

func GenerateMaze(size int) [][]int {
	maze := make([][]int, size*2+1)
	for i := range maze {
		maze[i] = make([]int, size*2+1)
		for j := range maze[i] {
			maze[i][j] = 0
		}
	}

	var recursiveBacktrack func(x, y int)
	recursiveBacktrack = func(x, y int) {
		dir := rand.Perm(4)
		for _, d := range dir {
			nx, ny := x+directions[d].X*2, y+directions[d].Y*2
			if nx > 0 && ny > 0 && nx < size*2 && ny < size*2 && maze[nx][ny] == 0 {
				maze[x+directions[d].X][y+directions[d].Y] = 1
				maze[nx][ny] = 1
				recursiveBacktrack(nx, ny)
			}
		}
	}

	maze[1][1] = 1
	recursiveBacktrack(1, 1)

	maze[0][1] = 1             // Eingang
	maze[size*2][size*2-1] = 1 // Ausgang

	return maze
}

func PrintMaze(maze [][]int) {
	for _, row := range maze {
		for _, cell := range row {
			if cell == 0 {
				fmt.Print("██")
			} else if cell == 1 {
				fmt.Print("  ")
			} else if cell == 7 {
				fmt.Print("o ")
			} else {
				fmt.Print("  ")
			}
		}
		fmt.Println()
	}
}

func GetMazeWithRandomExitNew(size int) [][]int {
	maze := make([][]int, size*2+1)
	for i := range maze {
		maze[i] = make([]int, size*2+1)
	}

	rand.Seed(time.Now().UnixNano())

	directions := []struct{ x, y int }{
		{0, 1},  // Nach rechts
		{1, 0},  // Nach unten
		{0, -1}, // Nach links
		{-1, 0}, // Nach oben
	}

	var recursiveBacktrack func(int, int)
	recursiveBacktrack = func(x, y int) {
		maze[x][y] = 1
		shuffledDirections := make([]struct{ x, y int }, len(directions))
		copy(shuffledDirections, directions)
		rand.Shuffle(len(shuffledDirections), func(i, j int) {
			shuffledDirections[i], shuffledDirections[j] = shuffledDirections[j], shuffledDirections[i]
		})

		for _, d := range shuffledDirections {
			dx, dy := d.x, d.y
			nx, ny := x+dx*2, y+dy*2
			if nx > 0 && ny > 0 && nx < size*2 && ny < size*2 && maze[nx][ny] == 0 {
				maze[x+dx][y+dy] = 1
				recursiveBacktrack(nx, ny)
			}
		}
	}

	recursiveBacktrack(1, 1)

	// Füge den Eingang hinzu
	maze[0][1] = 2 // Eingang

	// Füge einen zufälligen Ausgang hinzu
	exitSide := rand.Intn(4) // Wähle eine Seite: 0=oben, 1=rechts, 2=unten, 3=links
	if exitSide == 0 {
		exitSide = 2
	}
	if exitSide == 3 {
		exitSide = 1
	}
	var exitX, exitY int
	switch exitSide {
	case 0: // Oben
		exitX = 0
		exitY = 2*rand.Intn(size/2) + 1
	case 1: // Rechts
		exitX = 2*rand.Intn(size/2) + 1
		exitY = size * 2
	case 2: // Unten
		exitX = size * 2
		exitY = 2*rand.Intn(size/2) + 1
	case 3: // Links
		exitX = 2*rand.Intn(size/2) + 1
		exitY = 0
	}
	maze[exitX][exitY] = 3 // Ausgang

	// Füge Schlüssel hinzu
	keyX := 2*rand.Intn(size/2) + 1
	keyY := 2*rand.Intn(size/2) + 1
	maze[keyX][keyY] = 7 // Schlüssel

	return maze
}
