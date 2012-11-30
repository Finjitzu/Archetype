#pragma strict
var Target : GameObject;
var Block : Transform;
var whoAreYou : GameObject;
var Activated : boolean;
var myAudioSource : AudioSource;
function Start(){
	Block = transform.FindChild("Cube");
	myAudioSource = transform.GetComponent(AudioSource);
}

function Update(){
		if(Activated){
			if(whoAreYou == null){	
				Target.SendMessage("DeActivate");
				Block.transform.localPosition = Vector3(0,0,0);
				myAudioSource.pitch = 0.5;
				myAudioSource.Play();	
				Activated = false;
			}
		}
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Clone" || other.tag == "Player" || other.tag == "PushBlock"){
			Activated = true;
			whoAreYou = other.gameObject;
			Target.SendMessage("Activate");
			myAudioSource.pitch = 1;
			myAudioSource.Play();
			Block.transform.localPosition = Vector3(0,-.95,0);
	}
}

function OnTriggerExit(other : Collider){
	if(other.tag == "Clone" || other.tag == "Player" || other.tag == "PushBlock"){
		whoAreYou = null;
		Activated = false;
		Target.SendMessage("DeActivate");
		myAudioSource.pitch = 0.75;
		myAudioSource.Play();
		Block.transform.localPosition = Vector3(0,0,0);
	}

}