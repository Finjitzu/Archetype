#pragma strict

var savedLevel : int;
var myLabel : GameObject;
var nextLevel : int;
var DeleteButton : GameObject;

function Start () {
	savedLevel = PlayerPrefs.GetInt("SavedLevel");
	if(savedLevel == 0){
		myLabel.transform.GetComponent(UILabel).text = "Play";
		DeleteButton.SetActiveRecursively(false);
	}else{
		myLabel.transform.GetComponent(UILabel).text = "Continue";
		GameObject.Find("LevelManager").transform.GetComponent(LevelManager).myLevelNumber = savedLevel - 1;
		DeleteButton.SetActiveRecursively(true);
				
	}
}

function OnClick () {

	GameObject.Find("LevelManager").SendMessage("LevelComplete");

}