#pragma strict
var mySpeed : float;
var myBlock : GameObject;
var CollideTime : float;
var WaitTime : float;

function Start () {

}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Clone" || other.tag == "Player"){
			CollideTime = Time.time;
	}
}

function OnTriggerStay(other : Collider){
	if(other.tag == "Clone" || other.tag == "Player"){
		if(Time.time > CollideTime + WaitTime){
			if(Input.GetAxis("Horizontal") < 0){
				//if(myBlock.GetComponent(Rigidbody).velocity.y == 0){
					myBlock.GetComponent(Rigidbody).velocity.x = -mySpeed;
				//}
			}
		}
	}
}

function OnTriggerExit(other : Collider){
	if(other.tag == "Clone" || other.tag == "Player"){
		myBlock.GetComponent(Rigidbody).velocity.x = 0;
	}

}