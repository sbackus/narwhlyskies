
function Player() {
	this.image = images[0];
	this.height = this.image.height;
	this.width = this.image.width;
	this.health = 3;
	this.x = 30;
	this.y = 30;
	this.speed = 5;
	this.injured = false;
	this.injured_time = 0;
	this.injured_duration = 130;
	this.draw =  function(){
		if(this.injured){ //blink when injured
			if (this.injured_time % 4 == 0 || this.injured_time % 4 == 1 ){
				gameContext.drawImage(this.image,this.x,this.y);
			}
		}
		else{
			gameContext.drawImage(this.image,this.x,this.y);
		}
		
	};
	this.update = function(){
		this.injured_time ++;
		if (this.injured_time >= this.injured_duration){
			this.injured = false;
			this.injured_time = 0;
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