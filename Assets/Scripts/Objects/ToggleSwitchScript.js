#pragma strict
var Target : GameObject;
var AcceptAction : boolean;
var Activated : boolean;
var myAudioSource : AudioSource;

function Update(){
	if(AcceptAction){
		if(Input.GetButtonDown("Action")){
			Target.SendMessage("Activate");
			AcceptAction = false;
			Activated = true;
			transform.GetComponent(AudioSource).Play();
		}
	}
}
function OnTriggerEnter(other : Collider){
	if(!Activated){
		if(other.tag == "Clone" || other.tag == "Player"){
			print("Press Action");
			AcceptAction = true;			
		}
	}
}

function OnTriggerExit(other : Collider){
	if(!Activated){
		if(other.tag == "Clone" || other.tag == "Player"){
			print("Press Action");
			AcceptAction = false;			
		}
	}
}

