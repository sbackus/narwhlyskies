function Teleport(x,y) {
	this.image = images[15];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = x;
	this.y = y;
	this.speed = 10;
	this.time = 0;
	this.cleanup = function(){
		return this.time>130;
	};
	this.draw = function(){
		gameContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		this.time++;
	};
};