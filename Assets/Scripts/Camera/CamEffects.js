#pragma strict
var VignetScript : Vignetting;
var BloomScript : BloomAndLensFlares;
var Speed : float;
function Start(){
	Speed = 0.025;
	VignetScript = transform.GetComponent(Vignetting);
	BloomScript = transform.GetComponent(BloomAndLensFlares);
}

function SetVignetting(Value : float){
	while(VignetScript.intensity != Value){
		VignetScript.intensity = Mathf.MoveTowards(VignetScript.intensity, Value, Speed);
		BloomScript.bloomIntensity = Mathf.MoveTowards(BloomScript.bloomIntensity, 3, Speed);
		VignetScript.blur = Mathf.MoveTowards(VignetScript.blur, Value, Speed);
		//VignetScript.blurSpread = Mathf.MoveTowards(VignetScript.blurSpread, Value, Speed);
		yield;
	}
}

function ResetVignetting(){
		BloomScript.bloomIntensity = 0;
		VignetScript.intensity = 0;
		VignetScript.blur = 0;
		VignetScript.blurSpread = 0;
		yield;

}