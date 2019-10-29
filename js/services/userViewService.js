// adjusts the width and margin for all users prophile photos
let adjustProfilePhotos = function(){
	let totalHeight = window.innerHeight;
	let elements = document.getElementsByClassName("user");

	if(elements.length > 0){
		let factor = 0.21;
		// set the first to have a base for the others
		elements[0].style.height = (totalHeight*factor)+"px";
		let height = Math.round(elements[0].firstChild.offsetHeight);
		let margin = (elements[0].offsetHeight - height)/2.0;

		for(let userDiv of elements){
			userDiv.style.height = (totalHeight*factor)+"px";

			let element = userDiv.firstChild;
			element.style.width = height+"px";
			element.style.margin = margin+"px";

			// From the parent div, I decreased by 10% equivalent to menu and data div margins and image width and margins.
			userDiv.childNodes[1].style.width = (userDiv.offsetWidth - userDiv.offsetWidth*0.1 - height - 2*margin)+"px";

		}
	}
};

// adjusts the margin of profile photos that have width greater than height
let treatImages = function(){
	document.getElementById("info-no-suspicious").style.height = (window.innerHeight * 0.45)+"px";
	let imgs = document.getElementsByClassName("profile-image");
	for(let img of imgs){
		if(img.width > img.height){
			let margin = (img.width - img.height)/2.0;
			img.style.marginTop = margin+"px";
		}
	}
};

// shows/hides what will be shown about suspicious users. If there are suspicious users, show the list of them, if not, show a message saying that there are not.
let adjustContentSuspiciousUser = function(){
	if(numberOfSuspiciousUsers){
		document.getElementById("content-suspicious").style.display = "block";
		document.getElementById("content-info").style.height = "0px";
	} else {
		document.getElementById("content-suspicious").style.display = "none";
		document.getElementById("content-info").style.height = "auto";
	}
};

// adjusts the visibility of the components according with the number of reliable and suspicious users
let adjustComponentsVisibility = function(){

	if(numberOfReliableUsers > 0){
		document.getElementById("content-reliable").style.display = "block";
	} else {
		document.getElementById("content-reliable").style.display = "none";
	}

	adjustContentSuspiciousUser();
};

// creates and shows a user div
let showUser = function(user, index){

	let divImg = document.createElement("figure");
	divImg.classList.add("profile-photo");
	divImg.innerHTML = "<img alt='user"+user.id+"' class='profile-image' src='"+PROFILE_PHOTOS_PATH+user.photo+"' />";

	let divUser = document.createElement("div");
	divUser.id = "divUser-"+user.id;
	divUser.classList.add("user");
	// if(isReliable) divUser.classList.add("reliable-user");
	divUser.classList.add("reliable-user");
	divUser.appendChild(divImg);


	let userToString = "Nombre: " + user.name + "<br>" + 
					   "E-mail: " + user.email + "<br>" +
					   "Ciudad origen: " + user.cityOfBirth + "<br>" +
					   "Ciudad actual: " + user.currentCity + "<br>" + 
					   "En Erasmusu desde " + formatedDate(user.registrationDate) + "<br>" + 
					   "Último acceso en " + formatedDate(user.lastAcess);

	let divData = document.createElement("div");
	divData.classList.add("user-data");
	divData.innerHTML = userToString;
	divUser.appendChild(divData);

	let divContentMenu = document.createElement("div");
	divContentMenu.classList.add("content-menu");

	let inputCheckbox = document.createElement("input");
	inputCheckbox.type = "checkbox";
	inputCheckbox.className = "checkbox-user";
	inputCheckbox.id = "checkbox-"+user.id;
	inputCheckbox["user"] = user;
	inputCheckbox.onclick = function(){
		if(inputCheckbox.checked) numberOfSelectedCheckboxes++;
		else numberOfSelectedCheckboxes--;
		if(numberOfSelectedCheckboxes == 0){
			changeUserMenu(false, user.suspicious);
		}
	};
	divContentMenu.appendChild(inputCheckbox);

	
	let inputMenuImg = document.createElement("input");
	inputMenuImg.alt = "menu";
	inputMenuImg.classList.add("menu-image");
	inputMenuImg.src = "img/menu.png";
	inputMenuImg.type = "image";
	divContentMenu.appendChild(inputMenuImg);

	let divMenuDropdownSuspicious = document.createElement("div");
	divMenuDropdownSuspicious.classList.add("menu-dropdown");
	divContentMenu.appendChild(divMenuDropdownSuspicious);

	let divMenuDropdownReliable = document.createElement("div");
	divMenuDropdownReliable.classList.add("menu-dropdown");
	divContentMenu.appendChild(divMenuDropdownReliable);

	let divMenuSelect1 = document.createElement("div");
	divMenuSelect1.innerHTML = "Seleccionar";
	divMenuSelect1.onclick = function() {
		menuButtonClicked("select", user, divMenuSelect1);
	};

	let divMenuSelect2 = document.createElement("div");
	divMenuSelect2.innerHTML = "Seleccionar";
	divMenuSelect2.onclick = function() {
		menuButtonClicked("select", user, divMenuSelect2);
	};


	let divMenuReliable = document.createElement("div");
	divMenuReliable.innerHTML = "Marcar como seguro";
	divMenuReliable.onclick = function() {
		menuButtonClicked("entrust", user, divMenuReliable);
	};

	let divMenuRemove = document.createElement("div");
	divMenuRemove.innerHTML = "Eliminar";
	divMenuRemove.onclick = function() {
		menuButtonClicked("remove", user, divMenuRemove);
	};


	let divMenuSuspicious = document.createElement("div");
	divMenuSuspicious.innerHTML = "Marcar como sospechoso";
	divMenuSuspicious.onclick = function(){
		menuButtonClicked("distrust", user, divMenuSuspicious);
	};

	divMenuDropdownSuspicious.appendChild(divMenuSelect1);
	divMenuDropdownSuspicious.appendChild(divMenuReliable);
	divMenuDropdownSuspicious.appendChild(divMenuRemove);
	divMenuDropdownReliable.appendChild(divMenuSelect2);
	divMenuDropdownReliable.appendChild(divMenuSuspicious);


	inputMenuImg.onclick = function(event){
		if(user.suspicious) {
			menuClicked(divMenuDropdownSuspicious, event);
		} else {
			menuClicked(divMenuDropdownReliable, event);
		}
	};

	divUser.appendChild(divContentMenu);

	changeTypeDivUser(divUser, user);

	let type = user.suspicious ? "suspicious-" : "reliable-";
	document.getElementById(type+"users").appendChild(divUser);
};

// shows a div for each user in users
let showUsers = function(users){
	users.forEach(function(user, index){
		showUser(user, index);
	});
};

// try to remove a user from the view (and the system)
let removeUserFromTheView = function(user){
	if(removeFromList(users, user)){
		numberOfSuspiciousUsers--;
		let userDiv = document.getElementById("divUser-"+user.id);
	
		userDiv.remove();

		adjustContentSuspiciousUser();
		adjustFooter();
	}
};

// according with the user's type (suspicious or reliable), add or remove the class "reliable-user" from the div
let changeTypeDivUser = function(div, user){
	if(user.suspicious){
		div.classList.remove("reliable-user");
	} else {
		div.classList.add("reliable-user");
	}
};

// change the options for the user menu (options menu or checkboxes to select)
let changeUserMenu = function(showCheckboxes, isSuspicious, userId = undefined){

	let displayForOptions = (showCheckboxes) ? "none" : "block";
	let displayForSelection = (showCheckboxes) ? "block" : "none";
	let usersType = isSuspicious ? "suspicious" : "reliable";

	for(let menuImage of document.getElementsByClassName("menu-image")) {
		menuImage.style.display = displayForOptions;
	}

	document.getElementById(usersType + "-users-buttons").style.display = displayForSelection;

	for(let checkbox of document.getElementById("content-" + usersType).getElementsByClassName("checkbox-user")){
		checkbox.style.display = displayForSelection;
		if(showCheckboxes && checkbox.user.id == userId) checkbox.checked = true;
	}
};
