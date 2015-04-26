
function FarBackground() {
	this.image = randomChoice([images[1],images[10],images[11]]);
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = 0;
	this.y = 0;
	this.speed = 0.1;
	this.draw =  function(){
		farBackgroundContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		this.x -= this.speed;
	};
};