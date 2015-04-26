
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function offset_x(direction,distance){
	return Math.sin((direction/180)*Math.PI) * distance;
}
function offset_y(direction,distance){
	return Math.cos((direction/180)*Math.PI) * distance;
}

function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
};