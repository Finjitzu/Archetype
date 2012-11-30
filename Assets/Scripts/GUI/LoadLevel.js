#pragma strict
var LevelToLoad : int;

function Start () {

}

function OnClick () {

	GameObject.Find("GameManager").SendMessage("LoadNextLevel",LevelToLoad);

}