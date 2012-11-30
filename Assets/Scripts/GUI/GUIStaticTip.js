#pragma strict
var myLabel : GameObject;
var myTip : String;
function Start () {
	
	myLabel = GameObject.Find("StaticTips");
	myLabel.transform.GetComponent(UILabel).text = '';
}

function OnTriggerEnter(other : Collider){

	if(other.tag == "Player"){
		myLabel.transform.GetComponent(UILabel).text = myTip;
		transform.GetComponent(AudioSource).Play();				
	}
}

function OnTriggerExit(other : Collider){

	if(other.tag == "Player"){
		myLabel.transform.GetComponent(UILabel).text = '';				
	}
}