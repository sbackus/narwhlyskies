
function Laser(x,y) {
	this.image = images[14];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = x;
	this.y = y;
	this.speed = 10;
	this.cleanup = function(){
		return this.x>width
	};
	this.draw = function(){
		gameContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		this.x += this.speed
	};
};