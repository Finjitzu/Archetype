#pragma strict

var ZoomValue : int;
var CrossAirs : GameObject;
var myPlayerManager : GameObject;

function Start(){

	CrossAirs = GameObject.FindGameObjectWithTag("CrossAirs");
	myPlayerManager = GameObject.FindGameObjectWithTag("PlayerManager");
	
}

function OnTriggerEnter(other : Collider){
		if(other.tag == "Player"){
			Camera.main.SendMessage("ZoomTo",ZoomValue);
			Camera.main.transform.GetComponent(FollowCam).ZoomDisabled = true;
			Camera.main.transform.GetComponent(FollowCam).myExtraHeight = 1;	
			CrossAirs.transform.GetComponent(GunAiming).myAmmo = 0;
			myPlayerManager.transform.GetComponent(PlayerManager).enabled = false;			
		}
}