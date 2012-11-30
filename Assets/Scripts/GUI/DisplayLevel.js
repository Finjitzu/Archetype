#pragma strict

var myLevelManager : GameObject;

function Start () {

	myLevelManager = GameObject.Find("LevelManager");

	transform.GetComponent(UILabel).text = "Level " + myLevelManager.GetComponent(LevelManager).myLevelNumber;
}

