#pragma strict

var SpinSpeedX : float;
var SpinSpeedY : float;
var SpinSpeedZ : float;

var myTransform : Transform;
function Start () {

myTransform = transform;
}

function Update () {

Rotate();

}

function Rotate(){

	myTransform.Rotate(SpinSpeedX*Time.deltaTime,SpinSpeedY*Time.deltaTime,SpinSpeedZ*Time.deltaTime);
	

}