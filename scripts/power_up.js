
function PowerUp() {
	this.image = images[9];
	this.height = this.image.height;
	this.width = this.image.width;
	this.x = width;
	this.y = Math.random() * (height-this.height);
	this.speed = 2;
	this.collected = false;
	this.time = 0;
	this.cleanup = function(){
		return this.x< 0-this.width
	};
	this.draw = function(){
		if (!this.collected){
			gameContext.drawImage(this.image,this.x,this.y);
		}
	};
	this.update = function(){
		if (collision(this,player) && !this.collected){

			this.collected = true;
			player.powered_up = true;
			player.power_ups += 1;
			console.log(player.power_ups);
			var audio = new Audio('sounds/powerup2.wav');
			audio.play();
			
		}
		this.time ++;
		if (this.time > 1000000){
			this.time = 0;
		}

		this.y = (Math.cos(this.x*0.01)*(height-this.height)/2) + height/2 - this.height 
		this.x -= this.speed
	};
};