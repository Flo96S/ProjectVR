
const url = "http://localhost:8181/";

export async function GetRandomMazeFromServer() {
   const host = "http://127.0.0.1:8181/";
   await fetch(host + "getrandom").then(response => {
      if (!response.ok) {
         console.error("Error while fetching");
      }
      return response.json();
   }).then(data => {
      console.log(data);
      return data;
   }).catch(error => {
      console.error("Fetch error!", error);
   });
}

export function LoginGame() {

}

export function Logout(id, project) {
   fetch(url + "delete?id=" + id + "&project=" + project)
}

export function GetGames() {
   fetch(url).then(response => {
      if (!response.ok) {
         console.error("Error while fetching");
      }
      return response.json();
   }).then(data => {
      console.log(data);
   }).catch(error => {
      console.error("Fetch error: ", error);
   });
}

export function CreateLobby() {

}

export function GetPlayerValues() {

}