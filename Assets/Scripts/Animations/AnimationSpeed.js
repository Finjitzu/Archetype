#pragma strict

	var myRunSpeed : float;
	var myShootSpeed : float;

function Start () {
	
	transform.animation["Running"].speed = myRunSpeed;
	transform.animation["shoot"].speed = myShootSpeed;

}
