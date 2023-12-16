package game

import (
	"maze/pck/classes"
	"maze/pck/maze"
	"time"
)

type Game struct {
	Id               string
	Maze             [][]int
	CreateDate       time.Time
	FoundKey         bool
	ConnectedClients []classes.Character
}

// Maze, CreationDate, GameKey, ConnectedUsers
func CreateGame(size int) Game {
	var game Game
	createdmaze := maze.GenerateMazeWithExit(size)
	game.Maze = createdmaze
	game.CreateDate = time.Now()
	game.Id = classes.GenerateId()
	return game
}
