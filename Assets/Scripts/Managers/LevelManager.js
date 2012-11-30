#pragma strict
var myGameManager : GameObject;
var myLevelNumber : int;

function Start () {
	myGameManager = GameObject.Find("GameManager");
}

function LevelComplete(){
	myGameManager.GetComponent(AudioSource).Play();
	yield WaitForSeconds(.25);
	myGameManager.SendMessage("LoadNextLevel",myLevelNumber + 1);
}