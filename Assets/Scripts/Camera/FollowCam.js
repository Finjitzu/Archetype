
#pragma strict

var target : Transform;
var smoothTime = 0.3;
var height : float;
var width : float;
private var thisTransform : Transform;
private var velocity : Vector2;
var myZoom : int;
var myMinZoom : int;
var myMaxZoom : int;

var ZoomDisabled : boolean;
var myNormalHeight : int;
var myExtraHeight : int;

function Start()
{
	thisTransform = transform;
	myZoom  = Camera.main.orthographicSize;
	myNormalHeight = 5;
	myExtraHeight = 15;
	
}

function Update() 
{
	if(Input.GetAxis("Horizontal") > 0){
		width = 2 * 1;
	}else if(Input.GetAxis("Horizontal") <0){
		width = 2 * -1;		
	}else{
		width = 0;
	}
	if(Input.GetAxis("Vertical") > 0){
		height = myExtraHeight;
	}else if(Input.GetAxis("Vertical") < 0){
		height = myExtraHeight * -1;
	}else{
		height = myNormalHeight;
	}
	thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, 
		target.position.x + width, velocity.x, smoothTime);
	thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, 
		target.position.y + height, velocity.y, smoothTime);
		
	//zoom by scroll wheel
	//if zoom isn't disabled
	if(!ZoomDisabled){
		if(Input.GetAxis("Mouse ScrollWheel") < 0 ){ //back
			if(Camera.main.orthographicSize < myMaxZoom){
				myZoom = Camera.main.orthographicSize + 1;
				Camera.main.orthographicSize = myZoom;
			}
		}
		if(Input.GetAxis("Mouse ScrollWheel") > 0 ){ //forward
			if(Camera.main.orthographicSize > myMinZoom){
				myZoom = Camera.main.orthographicSize - 1;
				Camera.main.orthographicSize = myZoom;
			}
		}
	}
}

function ZoomTo(ToValue : int){

	while(Camera.main.orthographicSize != ToValue){
		Camera.main.orthographicSize = Mathf.MoveTowards(Camera.main.orthographicSize,ToValue,.25);
		yield;
	}
}

function ZoomToSlow(ToValue : int){
	myNormalHeight = 1;
	while(Camera.main.orthographicSize != ToValue){
		Camera.main.orthographicSize = Mathf.MoveTowards(Camera.main.orthographicSize,ToValue,.02);
		yield;
	}
}