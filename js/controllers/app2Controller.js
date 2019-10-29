/* global variables */

// useful for knowing when to hide checkboxes
let numberOfSelectedCheckboxes = 0;

// to be closed when there is a click outside of it
let globalDivMenu = undefined;

// array of all users
let users = [];
let numberOfSuspiciousUsers = 0;
let numberOfReliableUsers = 0;

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
	users = getUsers();
	numberOfSuspiciousUsers = users.filter(isSuspicious).length;
	numberOfReliableUsers = users.length - numberOfSuspiciousUsers;
	fillView();
};

init();


