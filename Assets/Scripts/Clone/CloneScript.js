#pragma strict

var Master : GameObject;
var CrossAirs : GameObject;
var PlayerManager : GameObject;
var myNumber : int;
var SpawnCheck : boolean;
var myChild : Transform;

var myTextTip : Transform;

function Awake(){
	SpawnCheck = true;
	PlayerManager = GameObject.FindGameObjectWithTag("PlayerManager");
	PlayerManager.transform.SendMessage("AddClone",transform.gameObject);	
	myTextTip = transform.FindChild("TextTip");
	myTextTip.GetComponent(TextMesh).text = (myNumber + 1).ToString();
}

function Start () {
	
	Master = GameObject.FindGameObjectWithTag("Player");
	CrossAirs = GameObject.FindGameObjectWithTag("CrossAirs");
	
	myChild = transform.FindChild("FemaleCloneRigify");	
	
	
	//Spawn();
	
}

function Update () {
	if(SpawnCheck){
		if(transform.GetComponent(CharacterMotor).grounded){
			transform.GetComponent(CharacterMotor).canControl = true;	
			SpawnCheck = false;
		}
	}
	


}

function Spawn(){
	SpawnCheck = true;
	PlayerManager.transform.SendMessage("AddClone",transform.gameObject);
	myTextTip.GetComponent(TextMesh).text = (myNumber + 1).ToString();
}

function OnTriggerEnter(other : Collider){

	if(other.tag == "BlockTrigger"){
		myChild.GetComponent(MixingCrossFadeClone).Pushing = true;
	}
	if(other.tag == "ToggleSwitch"){
		if(other.gameObject.GetComponent(ToggleSwitchScript).Activated == false){
			myTextTip.GetComponent(TextMesh).text = "Press 'E'";
		}
	}

}

function OnTriggerExit(other : Collider){

	if(other.tag == "BlockTrigger"){
		myChild.GetComponent(MixingCrossFadeClone).Pushing = false;
	}
	if(other.tag == "ToggleSwitch"){
		myTextTip.GetComponent(TextMesh).text = (myNumber + 1).ToString();
	}
}

function OnTriggerStay(other : Collider){

	if(other.transform.tag == "Player" || other.transform.tag == "Clone"){
		//if my pos x is greater than other pos x then push right
		if(transform.position.x > other.transform.position.x){
			transform.position.x = transform.position.x + .1;
		}else if(transform.position.x < other.transform.position.x){
			transform.position.x = transform.position.x - .1;
		}
		
		if(transform.position.y > other.transform.position.y){
			transform.position.y = transform.position.y + .1;
		}
	
	}
}