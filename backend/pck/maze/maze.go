package maze

import (
	"fmt"
	"math/rand"
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
			} else if cell == 4 {
				fmt.Print("o ")
			}
		}
		fmt.Println()
	}
}

func GenerateMazeWithExit(size int) [][]int {
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

	maze[0][1] = 2 // Eingang

	exitSide := rand.Intn(4)
	var exitX, exitY int
	switch exitSide {
	case 0:
		exitX = 0
		exitY = 2*rand.Intn(size/2)*2 + 1
	case 1:
		exitX = 2*rand.Intn(size/2)*2 + 1
		exitY = size * 2
	case 2:
		exitX = size * 2
		exitY = 2*rand.Intn(size/2)*2 + 1
	case 3:
		exitX = 2*rand.Intn(size/2)*2 + 1
		exitY = 0
	}
	maze[exitX][exitY] = 3 // Ausgang

	var specialX, specialY int

	for {
		specialX = rand.Intn(size*2) + 1
		specialY = rand.Intn(size*2) + 1
		if maze[specialX][specialY] == 1 {
			maze[specialX][specialY] = 4
			break
		}
	}

	return maze
}
