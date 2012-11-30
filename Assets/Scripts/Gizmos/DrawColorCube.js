#pragma strict
var Yellow : boolean;
var Blue : boolean;
var Red : boolean;
var Green : boolean;
var White : boolean;
var cyan : boolean;
var magenta : boolean;

function Start () {

}

function OnDrawGizmos () {
	if(Yellow){
    	Gizmos.color = Color.yellow;
    }else if(Blue){
    	Gizmos.color = Color.blue;
    }else if(Red){
    	Gizmos.color = Color.red;
    }else if(Green){
    	Gizmos.color = Color.green;
    }else if(White){
    	Gizmos.color = Color.white;
    }else if(cyan){
    	Gizmos.color = Color.cyan;
    }else if(magenta){
    	Gizmos.color = Color.magenta;    
    }else{
    	Gizmos.color = Color.clear;    
    }
    Gizmos.DrawCube (transform.GetComponent(Collider).bounds.center, transform.GetComponent(Collider).bounds.size);
}