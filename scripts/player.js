
function Player() {
	this.image = images[0];
	this.moving_up_image = images[7];
	this.moving_right_image = images[8];
	this.height = this.image.height-15;
	this.width = this.image.width;
	this.health = 4;
	this.x = 30;
	this.y = 30;
	this.speed = 5;
	this.powered_up = false;
	this.power_ups = 3;
	this.powered_up_time = 0;
	this.powered_up_duration = 130;
	this.injured = false;
	this.injured_time = 0;
	this.injured_duration = 160;
	this.draw =  function(){

		if(keys[key.up]||keys[key.w]){
			image = this.moving_up_image
		}else if(keys[key.right]||keys[key.d]){
			image = this.moving_right_image
		}
		else{
			image = this.image
		}

		if(this.injured){ //blink when injured
			if (this.injured_time % 4 == 0 || this.injured_time % 4 == 1 ){
				gameContext.drawImage(image,this.x,this.y);
			}
		}
		else{
			gameContext.drawImage(image,this.x,this.y);
		}
		
	};
	this.update = function(){
		this.injured_time ++;
		if (this.injured_time >= this.injured_duration){
			this.injured = false;
			this.injured_time = 0;
		}
		this.powered_up_time ++;
		if (this.powered_up_time >= this.powered_up_duration){
			this.powered_up = false;
			this.powered_up_time = 0;
		}
		if(keys[key.up]||keys[key.w]) {this.y-=this.speed;}
		if(keys[key.down]||keys[key.s]) {this.y+=this.speed;}
		if(keys[key.left]||keys[key.a]) {this.x-=this.speed;}
		if(keys[key.right]||keys[key.d]) {this.x+=this.speed;}
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;
		if(this.health<=0){
			game_over = true;
		}
		
	};
};