package api

import (
	"encoding/json"
	"fmt"
	"maze/pck/classes"
	"maze/pck/game"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var Games []game.Game

func StartApi() {
	r := gin.Default()
	r.GET("/", getdefault)
	r.GET("/get", get)
	r.GET("/open", open)

	r.POST("/join", join)

	r.PUT("/update", update)
	r.POST("/login", login)
	r.POST("/create", create)
	r.DELETE("/delete", delete)

	r.Run(":8181")
}

func create(c *gin.Context) {
	size := c.PostForm("size")
	sizeint, _ := strconv.Atoi(size)
	if sizeint < 8 {
		c.JSON(http.StatusBadRequest, "")
		return
	}
	game := game.CreateGame(sizeint)
	Games = append(Games, game)
	c.JSON(http.StatusOK, game.Id)
}

func join(c *gin.Context) {
	id := c.PostForm("id")
	jsonstr := c.PostForm("json")
	var user classes.Character
	err := json.Unmarshal([]byte(jsonstr), &user)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, false)
		return
	}
	for index, element := range Games {
		if element.Id == id {
			Games[index].ConnectedClients = append(Games[index].ConnectedClients, user)
		}
	}
	c.JSON(http.StatusOK, true)
}

func open(c *gin.Context) {
	c.JSON(http.StatusOK, "")
}

func delete(c *gin.Context) {
	id := c.Query("id")
	project := c.Query("project")

	for index, element := range Games {
		if element.Id == project {
			for ind, elm := range Games[index].ConnectedClients {
				if elm.Id == id {
					Games[index].ConnectedClients[ind] = Games[index].ConnectedClients[len(Games[index].ConnectedClients)-1]
					Games[index].ConnectedClients = Games[index].ConnectedClients[:len(Games[index].ConnectedClients)-1]
					break
				}
			}
		}
	}
	c.JSON(http.StatusOK, true)
}

func get(c *gin.Context) {
	id := c.Query("id")
	for _, element := range Games {
		if element.Id == id {
			c.JSON(http.StatusOK, element.ConnectedClients)
			return
		}
	}
	c.JSON(http.StatusBadRequest, "")
}

func getdefault(c *gin.Context) {
	var strgame []string
	for _, element := range Games {
		strgame = append(strgame, element.Id)
	}
	c.JSON(http.StatusOK, strgame)
}

func login(c *gin.Context) {
	c.JSON(http.StatusOK, "")
}

func update(c *gin.Context) {
	id := c.PostForm("id")
	jsonstr := c.PostForm("json")
	var char classes.Character
	err := json.Unmarshal([]byte(jsonstr), &char)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, false)
		return
	}
	for index, element := range Games {
		if element.Id == id {
			for ind, ele := range element.ConnectedClients {
				if ele.Id == char.Id {
					Games[index].ConnectedClients[ind] = char
					c.JSON(http.StatusOK, "")
					return
				}
			}
		}
	}
	fmt.Println("Nothing found")
	c.JSON(http.StatusBadRequest, "")
}
