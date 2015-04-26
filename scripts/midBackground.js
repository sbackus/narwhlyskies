
function MidBackground() {
	this.image = images[2];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = width;
	this.y = 30;
	this.speed = 0.8;
	this.cleanup = function(){
		return this.x< 0-this.width
	};
	this.draw =  function(){
		farBackgroundContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		this.x -= this.speed;
	};
};