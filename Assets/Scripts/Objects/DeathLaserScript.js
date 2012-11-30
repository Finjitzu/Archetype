#pragma strict

var layerMask : int;
var hit : RaycastHit;
var myLineRenderer : LineRenderer;
var myTransform : Transform;

var LaserParitcle : GameObject;

var PlayerManager : GameObject;

function Start () {
	layerMask = 1 << 11;
	layerMask = ~layerMask;
	myTransform = transform;
	myLineRenderer = transform.GetComponent(LineRenderer);
	myLineRenderer.SetPosition(0,myTransform.position);
	
	PlayerManager = GameObject.FindGameObjectWithTag("PlayerManager");
}

function Update () {

	if(Physics.Raycast(myTransform.position,myTransform.right,hit,Mathf.Infinity,layerMask)){
	
		myLineRenderer.SetPosition(1,hit.point);
		LaserParitcle.transform.position = hit.point;
		if(hit.collider.tag == "Clone"){
			//KillClone(hit.transform);
			var myNumber = hit.transform.GetComponent(CloneScript).myNumber;
			PlayerManager.SendMessage("KillClone2",myNumber);		 
		}
		
		 if(hit.collider.tag == "Player"){
		 	PlayerManager.SendMessage("KillMaster");
		 }
		 
		 if(hit.collider.tag == "Seed"){
		 	hit.transform.gameObject.SendMessage("InstantHatch");
			//var myNumber = hit.transform.GetComponent(CloneScript).myNumber;
			//PlayerManager.SendMessage("KillClone2",myNumber);		 
		}

	}

}

function KillClone(CloneToKill : Transform){

	yield WaitForEndOfFrame;
	var myNumber = CloneToKill.GetComponent(CloneScript).myNumber;
	PlayerManager.SendMessage("KillClone2",myNumber);

}