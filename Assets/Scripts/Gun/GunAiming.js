#pragma strict

var CurrentPlayer : GameObject;

var myDirection : Vector3;
var ProjectilePosition : Vector3;

var mainCamera : Camera;
var myTransform : Transform;
var CrossAirs_Distance_From_Player : float;
var maxCrossAirs_Distance : int;
var MousePosition : Vector3;
var MouseDirection : Vector3;
var MouseAngle : float;

var myLineRenderer : LineRenderer;
var LineSegments : int;
var LineStart : Vector3;

var ProjectileMass : float;
var InitialVelocity : float;
var Gravity : float;
var mySinAngle : float;
var myCosAngle : float;
var LinePositions : Vector3[];
var CollisionChecker : GameObject;

var RayLength : float;
var RayDirection : Vector3;

var f : float;
var i : float;
var j : int;

var newX : float;
var newY : float;
var oldX : float;
var oldY : float;

var Aiming : boolean;

var Projectile : GameObject;
var canShoot : boolean;

var myAmmo : int;

var layerMask : int;

function Start () {

	CurrentPlayer = GameObject.FindGameObjectWithTag("Player");
	mainCamera = Camera.main;
	myTransform = transform;
	
	myLineRenderer = myTransform.GetComponent(LineRenderer);
	LineStart = CurrentPlayer.transform.position;
	//myLineRenderer.SetVertexCount(LineSegments);
	layerMask = 1 << 11;
	layerMask = ~layerMask;

}

function Update () {
	//get mouse position
	MousePosition = mainCamera.ScreenToWorldPoint (Vector3 (Input.mousePosition.x,Input.mousePosition.y,10));
	//calculate distance
	CrossAirs_Distance_From_Player = Vector3.Distance(CurrentPlayer.transform.position,MousePosition);
	//calculate mouse direction from the player
	MouseDirection = MousePosition - CurrentPlayer.transform.position;
	
	MouseAngle = Vector3.Angle(MouseDirection,CurrentPlayer.transform.forward);
	
	if(CrossAirs_Distance_From_Player > maxCrossAirs_Distance){
		if(MousePosition.x > CurrentPlayer.transform.position.x && MousePosition.y > CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle;
			myCosAngle = MouseAngle;
			
		}else if(MousePosition.x > CurrentPlayer.transform.position.x && MousePosition.y < CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(-MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle * -1;
			myCosAngle = MouseAngle;
			MouseAngle = MouseAngle * -1;
			
		}else if(MousePosition.x < CurrentPlayer.transform.position.x && MousePosition.y < CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(-MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(-MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle * -1;
			myCosAngle = MouseAngle * -1;
			MouseAngle = MouseAngle * -1;
		}else if(MousePosition.x < CurrentPlayer.transform.position.x && MousePosition.y > CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(-MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle;
			myCosAngle = MouseAngle * -1;
		}
		myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(myCosAngle * Mathf.Deg2Rad) * 10),
								CurrentPlayer.transform.position.y + (Mathf.Sin(mySinAngle * Mathf.Deg2Rad) * 10), 0);
	}else{
		if(MousePosition.x > CurrentPlayer.transform.position.x && MousePosition.y > CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle;
			myCosAngle = MouseAngle;
			
		}else if(MousePosition.x > CurrentPlayer.transform.position.x && MousePosition.y < CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(-MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle * -1;
			myCosAngle = MouseAngle;
			MouseAngle = MouseAngle * -1;
		}else if(MousePosition.x < CurrentPlayer.transform.position.x && MousePosition.y < CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(-MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(-MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle * -1;
			myCosAngle = MouseAngle * -1;
			MouseAngle = MouseAngle * -1;
		}else if(MousePosition.x < CurrentPlayer.transform.position.x && MousePosition.y > CurrentPlayer.transform.position.y){
			//myTransform.position = Vector3(CurrentPlayer.transform.position.x + (Mathf.Cos(-MouseAngle * Mathf.Deg2Rad) * 10),
			//					CurrentPlayer.transform.position.y + (Mathf.Sin(MouseAngle * Mathf.Deg2Rad) * 10), 0);
			mySinAngle = MouseAngle;
			myCosAngle = MouseAngle * -1;
		}
		myTransform.position = mainCamera.ScreenToWorldPoint (Vector3 (Input.mousePosition.x,Input.mousePosition.y,10));
	}
	//print(MouseAngle);
	if(canShoot){
		if (Input.GetMouseButton(0)){
			Aiming = true;
			myTransform.GetComponent(MeshRenderer).enabled = true;
      		DrawTrajectory();      
		}
		if(Aiming){
			if(Input.GetMouseButtonUp(0)){
				if(myAmmo > 0){
					//FireProjectile();
					myTransform.GetComponent(MeshRenderer).enabled = false;	
					Aiming = false;
					myLineRenderer.SetVertexCount(0);
				}else{
					myTransform.GetComponent(MeshRenderer).enabled = false;
					Aiming = false;
					myLineRenderer.SetVertexCount(0);
					//print("Out of Ammo");
				}
			}
		}
	}
}

function DrawTrajectory(){
	
	//i=0;
	oldX = CurrentPlayer.transform.position.x;
	oldY = CurrentPlayer.transform.position.y;
	
	//calculate horizontal distance
	//var d : float = (InitialVelocity * InitialVelocity) * (Mathf.Sin(2 * (MouseAngle * Mathf.Deg2Rad)))  / Gravity;
	var d : float = (InitialVelocity * Mathf.Cos(MouseAngle * Mathf.Deg2Rad) / Gravity) * 
					((InitialVelocity * Mathf.Sin(MouseAngle * Mathf.Deg2Rad)) +
					Mathf.Sqrt((InitialVelocity * Mathf.Sin(MouseAngle * Mathf.Deg2Rad) * InitialVelocity * Mathf.Sin(MouseAngle * Mathf.Deg2Rad)) +
					2 * Gravity * CurrentPlayer.transform.position.y));
	//print(d);
	//calculate Time of flight
	var t : float = d / (InitialVelocity * Mathf.Cos(MouseAngle * Mathf.Deg2Rad));
	//var t : int = 2 * InitialVelocity * Mathf.Sin(MouseAngle * Mathf.Deg2Rad) / Gravity;
	//print(t);
	var myTimeStep : float = (t * 1) / LineSegments;
	f = myTimeStep;
	
	var Vox : float = InitialVelocity * (Mathf.Cos(MouseAngle * Mathf.Deg2Rad));
	var Voy : float = InitialVelocity * (Mathf.Sin(MouseAngle * Mathf.Deg2Rad));
	myLineRenderer.SetVertexCount(LineSegments);
	
	for(i=0;i<LineSegments;i++){
					
		newX =  (Vox * f) + CurrentPlayer.transform.position.x;
		newY =  ((Voy * f) - (.5 * Gravity * (f * f))) + CurrentPlayer.transform.position.y;
		//check for collsision		
		RayLength = Vector3.Distance(Vector3(oldX,oldY,0),Vector3(newX,newY,0));
		RayDirection = (Vector3(newX,newY,0) - Vector3(oldX,oldY,0)).normalized;	    		
		if(i != LineSegments -1){	
			if(Physics.Raycast(Vector3(oldX,oldY,0), RayDirection,RayLength + .2,layerMask)){
				myLineRenderer.SetVertexCount(i);
				//myLineRenderer.SetVertexCount(i-1);
				//LinePositions.Length = i-1;
				for(i=i;i<LineSegments;i++){			
					//myLineRenderer.SetPosition(i,Vector3(oldX,oldY,0));
					LinePositions[i] = Vector3(oldX,oldY,0);			
				}
				
				//break;				
		
			}else{
				//myLineRenderer.SetVertexCount(i);
				myLineRenderer.SetPosition(i,Vector3(newX, newY, 0));
				LinePositions[i] = Vector3(newX,newY, 0);	
			
				f = f + myTimeStep;
				oldX = newX;
				oldY = newY;																							
	   		}
	   	}else{
	   		myLineRenderer.SetPosition(i,Vector3(newX, newY, 0));
			LinePositions[i] = Vector3(newX,newY, 0);	   	
	   	}
	   	
		//yield;
	}
	
}

function FireProjectile(){
	if(myAmmo > 0){
		canShoot = false;
		myAmmo = myAmmo - 1;
		//canShoot = false;
		//myTransform.GetComponent(MeshRenderer).enabled = false;
		//CurrentPlayer.transform.GetComponent(CharacterMotor).canControl = false;
		var newProjectile = GameObject.Instantiate(Projectile,CurrentPlayer.transform.position,Quaternion.identity);
		var mySpeed : float = 100;
		for (i=0;i<LineSegments;i++){
			if(newProjectile != null){
				ProjectilePosition = newProjectile.transform.position;
				while (ProjectilePosition != LinePositions[i]){
					if(newProjectile != null){					
						newProjectile.transform.position = Vector3.MoveTowards(newProjectile.transform.position, LinePositions[i],mySpeed);
						ProjectilePosition = newProjectile.transform.position;
						yield;
					}else{
						break;
					}
				}
			}
			
		}
		if(newProjectile != null){
			newProjectile.gameObject.transform.GetComponent(SeedScript).SendMessage("Hatch");
		}
	}else{
		print("outOfAmmo");	
	}
	canShoot = true;
	
}

function OnDrawGizmosSelected(){
	for(j=0;j<LineSegments;j++){
		Gizmos.color = Color.yellow;
    	Gizmos.DrawSphere (LinePositions[j], .5);    	
	}
	
		Gizmos.color = Color.blue;
        Gizmos.DrawRay (Vector3(oldX,oldY,0), RayDirection * RayLength);	
}


