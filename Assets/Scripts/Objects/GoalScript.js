#pragma strict

var LevelManager : GameObject;

function Start () {

	LevelManager = GameObject.FindGameObjectWithTag("LevelManager");

}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		LevelManager.SendMessage("LevelComplete");
	}
}