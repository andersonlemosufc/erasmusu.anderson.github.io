// format a date (coming from json) in the format dd/MM/yyyy
let formatedDate = function(stringDate){
	let date = new Date(stringDate);
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();

	if(day < 10) day = "0"+day;
	if(month < 10) month = "0"+month;
	return day+"/"+month+"/"+year;
};
