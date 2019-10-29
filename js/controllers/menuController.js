// called when a button from the user menu is clicked
let menuButtonClicked = function(action, userId, element){
	element.parentElement.style.display = "none";
	switch(action){
		case "select": selectUser(userId); break;
		case "entrust": entrustUser(userId); break;
		case "remove": removeUser(userId); break;
		case "distrust": distrustUser(userId); break;
	}
};

// called when the "select" button of the user menu is clicked.

let selectUser = function(user){
	numberOfSelectedCheckboxes++;
	changeUserMenu(true, user.suspicious, user.id);
};

// called when the "remove" button of the user menu is clicked, and removes a suspicious user from the view.
let removeUser = function(user){

	setTimeout(function(){
		let confirmation = confirm("¿Realmente quieres eliminar a " + user.name + "?");
		if(confirmation) {
			removeUserFromTheView(user);
		}
	}, 3);
};

// called when the "entrust" button of the user menu is clicked, and mark a user as not suspicious (reliable).
let entrustUser = function(user){
	let res = changeTypeUser(user, true);
};

// called when the "distrust" button of the user menu is clicked, and mark a user as suspicious.
let distrustUser = function(user){
	changeTypeUser(user, false);
};

// change the type of one user for suspicious (if isSuspicious) or reliable (if !isSuspicious), and changes the user view to the adequate container.
// called for the functions entrust and distrust
let changeTypeUser = function(user, isSuspicious){

	user.suspicious = !isSuspicious;

	let index = findUserByType(users, user.id, user.suspicious);
	if(index >= 0){

		if(user.suspicious){
			numberOfSuspiciousUsers++;
			numberOfReliableUsers--;
		} else {
			numberOfSuspiciousUsers--;
			numberOfReliableUsers++;
		}

		let userDiv = document.getElementById("divUser-"+user.id);
		changeTypeDivUser(userDiv, user);

		let idDivContentUsers = (user.suspicious) ? "suspicious-users" : "reliable-users";
		let divContentUsers = document.getElementById(idDivContentUsers);
		divContentUsers.insertBefore(userDiv, divContentUsers.children[index]);


		adjustComponentsVisibility();
		adjustFooter();
		return true;
	} 
	return false;
};

// shows a user menu and hides all the others
let menuClicked = function(element){
	if(element.style.display != "block"){
		let others = document.getElementsByClassName("menu-dropdown");
		for(let el of others) {
			el.style.display = "none";
		}
		element.style.display = "block";
		globalDivMenu = element;
		event.stopPropagation();
	} else {
		element.style.display = "none";
	}
};

// changes the value "checked" of all checkboxes to "value" parameter from a type of user (defined by the parameter, isSuspicious)
let changeAllCheckboxes = function(value, isSuspicious){
	let userType = isSuspicious ? "suspicious" : "reliable";
	let checkboxes = document.getElementById("content-"+userType).getElementsByClassName("checkbox-user");
	for(let checkbox of checkboxes){
		checkbox.checked = value;
	}
	if(value){
		numberOfSelectedCheckboxes = checkboxes.length;
	} else {
		numberOfSelectedCheckboxes = 0;
		changeUserMenu(false, isSuspicious);
	}
};

// changes the type of users (many users to suspicious or reliable)
let changeTypes = function(areSuspicious){

	numberOfSelectedCheckboxes = 0;
	changeUserMenu(false, areSuspicious);

	let userType = areSuspicious ? "suspicious" : "reliable";
	let functionToChange = areSuspicious ? entrustUser : distrustUser;
	let checkboxes = Array.from(document.getElementById("content-"+userType).getElementsByClassName("checkbox-user"));
	
	for(let checkbox of checkboxes){
		if(checkbox.checked){
			functionToChange(checkbox.user);
			checkbox.checked = false;
		}
	}
};

// removes all selected users from the view
let removeSelected = function(){

	setTimeout(function(){
		let confirmation = confirm("¿Realmente quieres eliminar a los usuarios seleccionados?");
		if(confirmation) {
			numberOfSelectedCheckboxes = 0;
			changeUserMenu(false, true);

			let checkboxes = Array.from(document.getElementById("content-suspicious").getElementsByClassName("checkbox-user"));
			for(let checkbox of checkboxes){
				if(checkbox.checked){
					removeUserFromTheView(checkbox.user);
				}
			}
		}
	}, 3);
};
