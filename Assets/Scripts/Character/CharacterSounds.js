#pragma strict

var myAudioClip : AudioClip;
var FootClip : AudioClip;
var JumpClip : AudioClip;
var ShootClip: AudioClip;
var myAudioSource : AudioSource;
var myParent : GameObject;
var myShotParticle : GameObject;

function Start () {

	myAudioSource = transform.GetComponent(AudioSource);
	myParent = transform.parent.gameObject;
}

function PlayFootStep(){
	if(myParent.GetComponent(CharacterMotor).grounded){
		myAudioClip = FootClip;
		myAudioSource.clip = myAudioClip;
		myAudioSource.pitch = Random.Range(0.95,1);
		myAudioSource.volume = 0.1;
		myAudioSource.Play();
	}

}

function PlayJump(){
 
 	myAudioClip = JumpClip;
	myAudioSource.clip = myAudioClip;
	myAudioSource.pitch = Random.Range(0.95,1);
	myAudioSource.volume = 0.2;
	myAudioSource.Play();

}

function PlayShoot(){
 
 	myAudioClip = ShootClip;
	myAudioSource.clip = myAudioClip;
	myAudioSource.pitch = Random.Range(0.95,1);
	myAudioSource.volume = 0.5;
	myAudioSource.Play();
	
	myShotParticle.transform.GetComponent(ParticleSystem).Play();

}