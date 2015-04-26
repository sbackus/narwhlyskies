
function PowerUp() {
	this.image = images[3];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = width;
	this.y = Math.random() * (height-this.height);
	this.speed = randomChoice([2,3,4]);
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