package classes

import (
	"math/rand"
	"time"
)

type Position struct {
	PositionX float64
	PositionY float64
	PositionZ float64
	RotationX float64
	RotationY float64
	RotationZ float64
}

type Character struct {
	Id              string
	Headset         Position
	ControllerLeft  Position
	ControllerRight Position
	ItemLeft        int8
	ItemRight       int8
	BagLeft         int8
	BagRight        int8
	LastUpdate      time.Time
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

func GenerateId() string {
	b := make([]rune, 4)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
