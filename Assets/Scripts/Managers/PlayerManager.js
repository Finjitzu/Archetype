#pragma strict

var Master : GameObject;
var CrossAirs : GameObject;

var Clones : GameObject[];

var ActiveClones : int;
var NumberOfClones : int;
var MaximumClones : int;
var CurrentlyControlling : int;
var i : int;
var myNumKey : int;
var mainCamera : Camera;

var myIcons : GameObject[];

var MasterSpawnLocation : Vector3;

var myTransform : Transform;

var killSound : AudioClip;
var addSound : AudioClip;

function Start () {

	Master = GameObject.FindGameObjectWithTag("Player");
	CrossAirs = GameObject.FindGameObjectWithTag("CrossAirs");
	mainCamera = Camera.main;
	ActiveClones = 1;
	myTransform = transform;
	MasterSpawnLocation = Master.transform.position;
}

function Update () {
	if(Input.GetKeyDown("1")){
		//print("1");
		myNumKey = 0;
		KillMaster();
	}
	if(Input.GetKeyDown("2")){
		//print("1");
		myNumKey = 1;
		KillClone2(myNumKey);
	}
	if(Input.GetKeyDown("3")){
		//print("1");
		myNumKey = 2;
		KillClone2(myNumKey);
	}
	if(Input.GetKeyDown("4")){
		//print("1");
		myNumKey = 3;
		KillClone2(myNumKey);
	}
	if(Input.GetKeyDown("5")){
		//print("1");
		myNumKey = 4;
		KillClone2(myNumKey);
	}
	
	
	if(Input.GetButtonDown("ToggleClone")){
		SwitchClone();
	}
	if(Input.GetButtonDown("Master")){
		
		TurnOnMaster();
	}
	if(Input.GetButtonDown("Suicide")){
		KillClone();	
	}
	myTransform.position = mainCamera.transform.position;
}

function AddClone(CloneToAdd : GameObject){
	//TurnOffAll();
	//check for closed array spot
	for(i=1;i<Clones.length;i++){
		if(Clones[i] == null){
			Clones[i] = CloneToAdd;
			//CurrentlyControlling = i;
			CloneToAdd.GetComponent(CloneScript).myNumber = i;
			myIcons[i].transform.GetComponent(UISlicedSprite).spriteName = 'Dark';
			myTransform.GetComponent(AudioSource).clip = addSound;
			myTransform.GetComponent(AudioSource).Play();
			//mainCamera.transform.GetComponent(FollowCam).target = Clones[CurrentlyControlling].transform;
			break;		
		}
	}
}

function SwitchClone(){
	//check for clones first;
	NumberOfClones = 0;
	for(i=CurrentlyControlling;i<Clones.length;i++){
		if(Clones[i] != null){
			//check to see if i is the one being currently controlled
			if(i == CurrentlyControlling){
				//print("Only One Clone!");
				NumberOfClones = NumberOfClones + 1;
			}else{
				//found a new clone
				TurnOffMaster();
				
				//turn off current clone and turn on the new clone
				//Clones[CurrentlyControlling].transform.GetComponent(CharacterMotor).canControl = false;
				
				//Clones[i].transform.GetComponent(CharacterMotor).canControl = true;
				CurrentlyControlling = i;
				NumberOfClones = NumberOfClones + 1;
				break;				
			}
		}			
	}
	if(NumberOfClones == 0){
		print("NoClones");
		TurnOnMaster();	
	}else{
		print(NumberOfClones);
	}
}
function TogglePlayer(){
	
	
	if(myNumKey == 0){
		TurnOffAll();
		CurrentlyControlling = 0;
		myIcons[CurrentlyControlling].transform.GetComponent(UISlicedSprite).spriteName = 'Light';
		//mainCamera.transform.GetComponent(FollowCam).target = Clones[CurrentlyControlling].transform;
		CrossAirs.transform.GetComponent(GunAiming).canShoot = true;
		CrossAirs.transform.GetComponent(MeshRenderer).enabled = true;
		//Clones[CurrentlyControlling].transform.GetComponent(CharacterMotor).canControl = true;
	}else{
		if(Clones[myNumKey] != null){
			TurnOffAll();
			CurrentlyControlling = myNumKey;
			CrossAirs.transform.GetComponent(GunAiming).canShoot = false;
			CrossAirs.transform.GetComponent(MeshRenderer).enabled = false;
			//mainCamera.transform.GetComponent(FollowCam).target = Clones[CurrentlyControlling].transform;
			myIcons[CurrentlyControlling].transform.GetComponent(UISlicedSprite).spriteName = 'Light';
			//Clones[CurrentlyControlling].transform.GetComponent(CharacterMotor).canControl = true;
		}else{
			print("empty");
		}
	}
	

}
function TurnOffAll(){
	for(i=0;i<Clones.length;i++){
		if(Clones[i] != null){
			//Clones[i].transform.GetComponent(CharacterMotor).canControl = false;
			myIcons[i].transform.GetComponent(UISlicedSprite).spriteName = 'Dark';
		}else{
			myIcons[i].transform.GetComponent(UISlicedSprite).spriteName = 'X';
		}	
	}

}

function TurnOnMaster(){
	myIcons[0].transform.GetComponent(UISlicedSprite).spriteName = 'Light';
	CrossAirs.transform.GetComponent(GunAiming).canShoot = true;
	//CrossAirs.transform.GetComponent(MeshRenderer).enabled = true;
	Master.transform.GetComponent(CharacterMotor).canControl = true;
	//mainCamera.transform.GetComponent(FollowCam).target = Clones[0].transform;

}

function TurnOffMaster(){

	CrossAirs.transform.GetComponent(GunAiming).canShoot = false;
	//CrossAirs.transform.GetComponent(MeshRenderer).enabled = false;
	//Master.transform.GetComponent(CharacterMotor).canControl = false;

}
function KillClone(){
	if(CurrentlyControlling != 0){
		myIcons[CurrentlyControlling].transform.GetComponent(UISlicedSprite).spriteName = 'X';
		Destroy(Clones[CurrentlyControlling].gameObject);
		CrossAirs.transform.GetComponent(GunAiming).myAmmo = CrossAirs.transform.GetComponent(GunAiming).myAmmo + 1;
		myTransform.GetComponent(AudioSource).clip = killSound;
		myTransform.GetComponent(AudioSource).Play();
		TurnOnMaster();
	}
}

function KillAllClones(){

	for(i=1;i< Clones.length;i++){
		if(Clones[i] != null){
			Destroy(Clones[i].gameObject);
			CrossAirs.transform.GetComponent(GunAiming).myAmmo = CrossAirs.transform.GetComponent(GunAiming).myAmmo + 1;
			myTransform.GetComponent(AudioSource).clip = killSound;
			myTransform.GetComponent(AudioSource).Play();
			myIcons[i].transform.GetComponent(UISlicedSprite).spriteName = 'X';
		}	
	}
	TurnOnMaster();
}

function KillClone2(CloneToKill : int){
	if(CloneToKill != 0){
		myIcons[CloneToKill].transform.GetComponent(UISlicedSprite).spriteName = 'X';
		Destroy(Clones[CloneToKill].gameObject);
		CrossAirs.transform.GetComponent(GunAiming).myAmmo = CrossAirs.transform.GetComponent(GunAiming).myAmmo + 1;
		myTransform.GetComponent(AudioSource).clip = killSound;
		myTransform.GetComponent(AudioSource).Play();
		TurnOnMaster();
	}
}

function KillMaster(){
	KillAllClones();
	myTransform.GetComponent(AudioSource).clip = killSound;
	myTransform.GetComponent(AudioSource).Play();
	Master.transform.position = MasterSpawnLocation;
}