#pragma strict

var PlayerManagerObj : GameObject;
var i : int;

function Start () {
	PlayerManagerObj = GameObject.FindGameObjectWithTag("PlayerManager");
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		Reset();
	}
	if(other.tag == "Clone"){
		KillClone(other);
	}
}

function Reset(){
	PlayerManagerObj.SendMessage("KillAllClones");
	PlayerManagerObj.SendMessage("KillMaster");	
}

function KillClone(other : Collider){
	var myNumber = other.GetComponent(CloneScript).myNumber;
	PlayerManagerObj.SendMessage("KillClone2",myNumber);
}