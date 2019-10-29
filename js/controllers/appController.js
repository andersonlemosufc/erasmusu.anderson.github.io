/* global variables */

// useful for knowing when to hide checkboxes
let numberOfSelectedCheckboxes = 0;

// to be closed when there is a click outside of it
let globalDivMenu = undefined;

// array of all users
let users = [];
let numberOfSuspiciousUsers = 0;
let numberOfReliableUsers = 0;

let getUsers = function(){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4) {

			if(this.status == 200){
			users = JSON.parse(this.responseText);
			
			numberOfSuspiciousUsers = users.filter(isSuspicious).length;
			numberOfReliableUsers = users.length - numberOfSuspiciousUsers;

			fillView();
			} else {
				alert("Hubo un problema de \"política de misma origen\" y no se pudo leer el archivo json. Usted será redirigido a la página que no lee el archivo json.");
				window.location.replace("version_two.html");
			}
		} 	
	};
	xmlhttp.open("GET", "data/users.json", true);
	xmlhttp.send();

};

// fill the user componentes
let fillView = function(){
	window.onresize = resize;	
	window.addEventListener("load", resize);

	sortUsers(users);
	showUsers(users);


	window.onclick = function(){

		if(globalDivMenu != undefined){
			globalDivMenu.style.display = "none";
			globalDivMenu = undefined;
		}
	};

	resize();
}

let init = function(){
	getUsers();	
};

init();


