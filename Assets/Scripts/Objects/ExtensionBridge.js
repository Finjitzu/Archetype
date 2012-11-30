#pragma strict

var oriPosition : Vector3;
var TargetPosition : Vector3;
var myTransform : Transform;
var mySpeed : float;
var Activated : boolean;
var myAudioSource : AudioSource;


function Start () {
	
	myTransform = transform;
	oriPosition = myTransform.position;
	myAudioSource = myTransform.GetComponent(AudioSource);

}

function Activate () {
	Activated = true;
	
	while (myTransform.position != TargetPosition){
		if(myAudioSource.isPlaying == false){
			myAudioSource.Play();
		}
		myTransform.position = Vector3.MoveTowards(myTransform.position, TargetPosition, mySpeed);
		if(Activated){
			yield;
		}else{
						
			break;
		}		
	}
	
	myAudioSource.Stop();
	
	
}

function DeActivate () {
	Activated = false;
	
	while (myTransform.position != oriPosition){
		if(myAudioSource.isPlaying == false){
			myAudioSource.Play();
		}
		myTransform.position = Vector3.MoveTowards(myTransform.position, oriPosition, mySpeed);
		if(!Activated){
			yield;
		}else{
			
			break;
		}		
	}
	
	myAudioSource.Stop();
	
	
}