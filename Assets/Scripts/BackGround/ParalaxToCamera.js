#pragma strict
var myCamera : Camera;
var myTransform : Transform;
var myScale : float;
function Start () {

	myCamera = Camera.main;
	myTransform = transform;

}

function Update () {

	myTransform.position.x = myCamera.transform.position.x * myScale * -1;
	myTransform.position.y = myCamera.transform.position.y * myScale * -1;

}