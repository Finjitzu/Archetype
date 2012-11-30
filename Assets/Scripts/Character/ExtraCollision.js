#pragma strict
var LeftWall : boolean;
var RightWall : boolean;


function OnTriggerStay (other : Collider) {

	if(other.transform.tag == "Player" || other.transform.tag == "Clone"){
		if(LeftWall){
			other.transform.position.x = other.transform.position.x + .5;
		}
		if(RightWall){
			other.transform.position.x = other.transform.position.x - .5;
		}
	
	}

}