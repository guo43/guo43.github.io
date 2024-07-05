var el = document.querySelector("body");

var header = document.querySelector("header");
var main = document.querySelector(".main");

function get(ele) {
	return document.querySelector(ele);
}

var flex_container = get('#flex-container');
var body = get('body');


var offset = 0;
console.log(body.clientHeight);
console.log(flex_container.offsetHeight);

el.addEventListener("wheel", function (event) {
	event.preventDefault();

	if (event.deltaY > 0 && body.clientHeight + offset <= flex_container.offsetHeight) {
		offset += event.deltaY;
		header.classList.add('header-wheel');
	} else if (event.deltaY > 0 && body.clientHeight + offset > flex_container.offsetHeight) {
	} else {
		if (offset > 0) {offset += event.deltaY;};
	}

	if (-10 < offset && offset <= 0) {
		header.classList.remove('header-wheel');
	}
	console.log(offset)
})