
function Obstacle() {
	this.image = randomChoice([images[3],images[3],images[4],images[5],images[6],images[6],images[6],images[6]]);
	this.height = this.image.height-15;
	this.width = this.image.width;
	this.destroyed = false;
	this.x = width;
	this.y = Math.random() * (height-this.height);
	this.speed = randomChoice([1,2,3,4,5]);
	this.cleanup = function(){
		return this.x< 0-this.width || this.destroyed
	};
	this.draw =  function(){
		gameContext.drawImage(this.image,this.x,this.y);
	};
	this.update = function(){
		if (collision(this,player)){
			if (player.injured == false){
				var audio = new Audio('sounds/splat.wav');
				audio.play();
				player.health --;
				player.injured = true;
			}
			
		}
		this.x -= this.speed
	};
};