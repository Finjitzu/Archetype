#pragma strict
var Pushing : boolean;
var Parent : Transform;
function Start ()
{
	// Add a duplicate shoot animation which we set up to only animate the upper body
	// We use this animation when the character is running.
	// By using mixing for this we dont need to make a seperate running-shoot animation
	//animation.AddClip(animation["shoot"].clip, "shootUpperBody");
	//animation["shootUpperBody"].AddMixingTransform(transform.Find("mover/gun"));
	//animation["shootUpperBody"].AddMixingTransform(transform.Find("mover/roothandle/spine1"));

	// Set all animations to loop
	//animation.wrapMode = WrapMode.Loop;

	// Except our action animations, Dont loop those
	//animation["jump"].wrapMode = WrapMode.Clamp;
	//animation["shoot"].wrapMode = WrapMode.Clamp;
	//animation["shootUpperBody"].wrapMode = WrapMode.Clamp;
	
	// Put idle and run in a lower layer. They will only animate if our action animations are not playing
	animation["Idle1"].layer = -1;
	animation["Running"].layer = -1;
	animation["Pushing"].layer = -1;
	
	animation.Stop();
	
	Parent = transform.parent.gameObject.transform;
}


function Update () {
	// Play either the run or idle animation
	if (Mathf.Abs(Input.GetAxis("Horizontal")) > 0.1){		

			if(!Pushing){
				animation.CrossFade("Running");
			}else{
				animation.CrossFade("Pushing");
			}

	}
	else
		animation.CrossFade("Idle1");

		// Play the cross fade animation
		if (Input.GetButtonDown ("Jump"))
		{
			animation.CrossFade("Jump");
		}

}

function CrossFade (animationToFade : String){

	animation.CrossFade(animationToFade);

}
