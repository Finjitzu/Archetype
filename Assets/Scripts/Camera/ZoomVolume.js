#pragma strict

var ZoomValue : int;

function OnTriggerEnter(other : Collider){
		if(other.tag == "Player"){
			Camera.main.SendMessage("ZoomTo",ZoomValue);			
		}
}