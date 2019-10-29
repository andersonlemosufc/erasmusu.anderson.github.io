// since the heights of all divs are dynamic (trying to be as responsive as possible), this method adjusts the footer position
let adjustFooter = function(){
	let lastElement = document.getElementById("content-info");
	let top = lastElement.offsetHeight + lastElement.offsetTop;

	let footer = document.getElementsByTagName("footer")[0];

	if(top > (window.innerHeight - footer.offsetHeight - 100)){
		footer.style.top = top+"px";
	} else {
		footer.style.top = "auto";
	}
};

// called whenever the window is resized to fit div sizes as responsibly as possible
let resize = function(){
	adjustProfilePhotos();
	treatImages();
	adjustComponentsVisibility();
	adjustFooter();
};
