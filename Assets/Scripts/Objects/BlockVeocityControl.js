#pragma strict
var myTransform : Transform;
function Start () {
	myTransform = transform;
}

function FixedUpdate () {

	if(myTransform.GetComponent(Rigidbody).velocity.y != 0){
		//myTransform.GetComponent(Rigidbody).velocity.x = 0;
	}

}