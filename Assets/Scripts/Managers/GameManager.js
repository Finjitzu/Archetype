#pragma strict

function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}

function Start () {

}


function LoadNextLevel(LevelToLoad : int){
	if(LevelToLoad == 11){		
		Application.LoadLevel(0);
		PlayerPrefs.SetInt("SavedLevel",0);
	}else{	
		Application.LoadLevel(LevelToLoad);
		PlayerPrefs.SetInt("SavedLevel",LevelToLoad);
	}

}