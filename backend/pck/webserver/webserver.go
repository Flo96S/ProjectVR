package webserver

import (
	"fmt"
	"log"
	"maze/pck/classes"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var positions = struct {
	sync.RWMutex
	positions map[string]classes.Character
}{positions: make(map[string]classes.Character)}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsEndpoint)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "home page")
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println("Client connected!")
	err = ws.WriteMessage(1, []byte("Hi client!"))
	if err != nil {
		log.Println(err)
	}
	reader(ws)

	fmt.Fprintf(w, "Hello World")
}

func reader(conn *websocket.Conn) {
	messageType, p, err := conn.ReadMessage()
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println(string(p))

	if err := conn.WriteMessage(messageType, p); err != nil {
		log.Println(err)
		return
	}
}

func CreateServer() {
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
