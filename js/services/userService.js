// compare two users by name (used for sorting)
let compareUsers = function(user1, user2){
	return user1.name.trim().toLowerCase().localeCompare(user2.name.trim().toLowerCase());
};

// sort a array of users by name (using the function above)
let sortUsers = function(users){
	users.sort(compareUsers);
};

// removes a user from a user list
let removeFromList = function(users, user){
	let index = findUser(users, user.id);
	if(index < 0 || index >= users.length) return false;
	users.splice(index, 1);
	return true;
};

// add a user to a user list (maintaining the array sorted)
let addInList = function(users, user){
	let i = 0;
	for(i=0;i<users.length;i++){
		let c = compareUsers(user, users[i]);
		if(compareUsers(user, users[i]) <= 0) break;
	}
	users.splice(i, 0, user);
	return i;
};

// searches a user in a list (returns the index of the user or -1 if the user is not in the list)
let findUser = function(users, userId){
	for(let i in users){
		if(users[i].id == userId) return i;
	}
	return -1;
};

let findUserByType = function(users, userId, isSuspicious){
	let k = 0;
	for(let user of users){
		if(user.suspicious != isSuspicious) continue;
		if(user.id == userId) return k;
		k++;
	}
	return -1;
};

// returns the suspicious value of a user
let isSuspicious = function(user){
	return user.suspicious;
};
