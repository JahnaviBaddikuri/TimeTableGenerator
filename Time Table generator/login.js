window.onload = function () {
	PageLoad();
	
}
var userList = new Array();
var User = function(id,pass,role){
	this.id = id;
	this.pass = pass;
	this.role = role;
	return this;
}

function PageLoad(){
	userList.push(new User('admin','admin','Admin'));
	userList.push(new User('user','user','User'));
}

function Login() {
	var enteredUserName = document.getElementById("username").value;
	var enteredPass = document.getElementById("password").value;
	var result = false;
	for (var i = 0; i < userList.length; i++) {
		if(userList[i].id == enteredUserName){
			if(userList[i].pass == enteredPass){
				result = true;
				sessionStorage.setItem("UserRole",userList[i].role);
				sessionStorage.setItem("UserName",userList[i].id);
				break;
			}	
		}
	}
 	if(!result){
 		alert("Incorrect User name or Password");
 	}
 	if(result){
 		window.location = "index.html";
 	}


}