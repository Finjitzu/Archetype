#pragma strict
var myClone : GameObject;
var myParticle : GameObject;
var hatched : boolean;
function Start () {

	
}

function Hatch(){
	//grow stuff here
	//instantiate and destroy
	if(!hatched){
		hatched = true;
		transform.GetComponent(AudioSource).Play();
		myParticle.transform.GetComponent(ParticleSystem).Play();
		yield WaitForSeconds(.25);
		GameObject.Instantiate(myClone,Vector3(transform.position.x,transform.position.y + 2,0),Quaternion.identity);
		yield WaitForSeconds(.25);
		Destroy(gameObject);
	}
	
}

function InstantHatch(){
	if(!hatched){
		hatched = true;
		GameObject.Instantiate(myClone,Vector3(transform.position.x,transform.position.y + 2,0),Quaternion.identity);
		Destroy(gameObject);
	}
}