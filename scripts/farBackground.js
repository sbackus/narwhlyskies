
function FarBackground() {
	this.image = images[1];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = 0;
	this.y = 0;
	this.speed = 0.07;
	this.draw =  function(){
		farBackgroundContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		this.x -= this.speed;
	};
};