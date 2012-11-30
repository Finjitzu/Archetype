#pragma strict

var myChild : Transform;
var myTextTip : Transform;

function Start(){
	
	myChild = transform.FindChild("FemaleCloneRigify");
	myTextTip = transform.FindChild("TextTip");
}

function OnTriggerEnter(other : Collider){

	if(other.tag == "BlockTrigger"){
		myChild.GetComponent(MixingCrossfade).Pushing = true;
	}
	if(other.tag == "ToggleSwitch"){
		if(other.gameObject.GetComponent(ToggleSwitchScript).Activated == false){
			myTextTip.GetComponent(TextMesh).text = "Press 'E'";
		}
	}
	if(other.tag == "ToggleSwitchEnd"){
		if(other.gameObject.GetComponent(ToggleSwitchEnd).Activated == false){
			myTextTip.GetComponent(TextMesh).text = "Press 'E'";
		}
	}

}

function OnTriggerExit(other : Collider){

	if(other.tag == "BlockTrigger"){
		myChild.GetComponent(MixingCrossfade).Pushing = false;
	}
	
	if(other.tag == "ToggleSwitch"){
		myTextTip.GetComponent(TextMesh).text = "";
	}
}
