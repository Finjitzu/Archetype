#pragma strict

var myPlayerManager : GameObject;
var PlayerManagerScript : PlayerManager; 
var i : int;
var maxX : float;
var minX : float;
var maxY : float;
var minY : float;
var myX : float;
var myY : float;

var myTransform : Transform;

function Start () {

	myPlayerManager = GameObject.FindGameObjectWithTag("PlayerManager");
	PlayerManagerScript = myPlayerManager.GetComponent(PlayerManager);
	
	
	myTransform = transform;
}

function Update () {
	myTransform.position.x = minX + ((maxX - minX) * .5);
	myTransform.position.y = minY + ((maxY - minY) * .5);
	CalculatePosition();

}

function CalculatePosition(){
	
	for(i=0;i<PlayerManagerScript.Clones.length;i++){
		if(i == 0){
			maxX = PlayerManagerScript.Clones[i].transform.position.x;
			minX = PlayerManagerScript.Clones[i].transform.position.x;
			maxY = PlayerManagerScript.Clones[i].transform.position.y;
			minY = PlayerManagerScript.Clones[i].transform.position.y;
		}
		if(PlayerManagerScript.Clones[i] != null){
			myX = PlayerManagerScript.Clones[i].transform.position.x;
			myY = PlayerManagerScript.Clones[i].transform.position.y;
			if(myX > maxX){
				maxX = myX;
			}
			if(myY < minY){
				minY = myY;
			}
			if(myX < minX){
				minX = myX;
			}
			if(myY > maxY){
				maxY = myY;
			}		
		}
		//yield;	
	}
}