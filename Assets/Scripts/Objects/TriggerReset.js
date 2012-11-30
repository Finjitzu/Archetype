#pragma strict

var PlayerManagerObj : GameObject;
var ObjectsToReset : GameObject[];
var ObjectsPosition : Vector3[];
var i : int;

function Start () {
	PlayerManagerObj = GameObject.FindGameObjectWithTag("PlayerManager");
	for(i=0;i<ObjectsToReset.length;i++){
		ObjectsPosition[i] = ObjectsToReset[i].transform.position; 	
	}
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
	transform.GetComponent(AudioSource).Play();
	PlayerManagerObj.SendMessage("KillAllClones");
	PlayerManagerObj.GetComponent(PlayerManager).MasterSpawnLocation = transform.position;
	for (i=0;i<ObjectsToReset.length;i++){
		if(ObjectsToReset[i].tag == "ToggleSwitch"){
			ObjectsToReset[i].transform.GetComponent(ToggleSwitchScript).Target.SendMessage("DeActivate");
			ObjectsToReset[i].transform.GetComponent(ToggleSwitchScript).Activated = false;
		}else{
			ObjectsToReset[i].transform.position = ObjectsPosition[i];
		}
	}
	
}

function KillClone(other : Collider){
	var myNumber = other.GetComponent(CloneScript).myNumber;
	PlayerManagerObj.SendMessage("KillClone2",myNumber);
}