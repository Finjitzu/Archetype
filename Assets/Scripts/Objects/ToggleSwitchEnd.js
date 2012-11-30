#pragma strict

var Target : GameObject;
var AcceptAction : boolean;
var Activated : boolean;
var myAudioSource : AudioSource;
var Player : GameObject;
var PlayerRigify : Transform;
var PlayerTextTip : Transform;
var deathAudio : AudioClip;
var realClone : GameObject;
var warpSound : AudioClip;
var ShutDown : AudioClip;
var NumberSound : AudioClip;

var LevelManager : GameObject;


function Start (){
	myAudioSource = transform.GetComponent(AudioSource);
	Player = GameObject.FindGameObjectWithTag("Player");
	PlayerRigify = Player.transform.FindChild("FemaleCloneRigify");
	PlayerTextTip = Player.transform.FindChild("TextTip");
	LevelManager = GameObject.FindGameObjectWithTag("LevelManager");

}

function Update(){
	if(AcceptAction){
		if(Input.GetButtonDown("Action")){
			Target.SendMessage("Activate");
			AcceptAction = false;
			Activated = true;
			transform.GetComponent(AudioSource).Play();
			Player.GetComponent(CharacterMotor).canControl = false;
			PlayerRigify.GetComponent(MixingCrossfade).enabled = false;
			PlayerRigify.GetComponent(CharacterSounds).enabled = false;
			PlayerRigify.GetComponent(RotateMe).enabled = false;
			PlayerRigify.GetComponent(AudioSource).enabled = false;
			PlayerRigify.GetComponent(Animation).Stop();
			EndIt();			
		}
	}
}
function OnTriggerEnter(other : Collider){
	if(!Activated){
		if(other.tag == "Clone" || other.tag == "Player"){
			AcceptAction = true;			
		}
	}
}

function OnTriggerExit(other : Collider){
	if(!Activated){
		if(other.tag == "Clone" || other.tag == "Player"){
			AcceptAction = false;			
		}
	}
}

function EndIt(){

	LerpTextSize();
	
	
}

function LerpTextSize(){

	PlayerTextTip.GetComponent(TextMesh).text = "";
	PlayerRigify.GetComponent(Animation).Play("Puzzled");
	yield WaitForSeconds(2.5);
	Camera.main.SendMessage("ZoomToSlow",4);
	Camera.main.SendMessage("SetVignetting",8);
	PlayerTextTip.GetComponent(TextMesh).characterSize = 0;
	PlayerTextTip.GetComponent(TextMesh).text = "0";
	myAudioSource.clip = NumberSound;
	myAudioSource.Play();
	while (PlayerTextTip.GetComponent(TextMesh).characterSize != 0.5){
		PlayerTextTip.GetComponent(TextMesh).characterSize = Mathf.MoveTowards(PlayerTextTip.GetComponent(TextMesh).characterSize,0.5,.005);
		yield;
	}
	//myAudioSource.clip = ShutDown;
	//myAudioSource.Play();
	yield WaitForSeconds(5.6);
	Camera.main.SendMessage("ResetVignetting");
	myAudioSource.clip = deathAudio;
	myAudioSource.Play();
	PlayerTextTip.GetComponent(TextMesh).text = "";
	PlayerRigify.FindChild("Cube").transform.GetComponent(SkinnedMeshRenderer).active = false;
	
	realClone.transform.FindChild("FemaleCloneRigify").transform.SendMessage("CrossFade","Idle2");
	
	yield WaitForSeconds(1);
	//Camera.main.SendMessage("ZoomTo",10);
	
	
	MoveRealCloneRight();
	
}

function MoveRealCloneRight(){
	
	Camera.main.transform.GetComponent(FollowCam).target = realClone.transform;
	yield WaitForSeconds(2);
	Camera.main.SendMessage("ZoomTo",10);
	realClone.transform.FindChild("FemaleCloneRigify").transform.SendMessage("CrossFade","Running");
	while(realClone.transform.position.x != 135) {
		realClone.transform.position.x = Mathf.MoveTowards(realClone.transform.position.x, 135, .125);
		yield;	
	}
	realClone.transform.FindChild("FemaleCloneRigify").transform.FindChild("Cube").transform.GetComponent(SkinnedMeshRenderer).active = false;	
	LevelManager.SendMessage("LevelComplete");		
}

