// alert(state.history[0].variables.my_var)
// if (state.history[0].variables.my_var == 0){
// 	alert("test")
// }
// alert(state.history[0].variables.my_var);
// state.history[0].variables.my_var = 1;

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000/60);
			};
})();

var width = document.getElementById("gameCanvas").width;
var height = document.getElementById("gameCanvas").height;

var images = [];
var obstacle_spawn_rate = 0;
var doneImages = 0;
var requiredImages = 0;
var game_over = false;
var game_won = false;
var game_duration = 6000;
var game_time = 0;
var player = null;
var obstacles = []
var midBackgrounds = []
var powerUps = []
var lasers = [];

var gameContext = document.getElementById("gameCanvas").getContext("2d");
var farBackgroundContext = document.getElementById("gameCanvas").getContext("2d");

var keys = [];

var player = null;

var key = {
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	space: 32,
	w: 87,
	a: 65,
	s: 83,
	d: 68,
}

$(document).keydown(function(e){
	e.preventDefault();
	keys[e.keyCode ? e.keyCode : e.which] = true;
});

$(document).keyup(function(e){
	e.preventDefault();
	delete keys[e.keyCode ? e.keyCode : e.which];
});

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
var canvas = document.getElementById('gameCanvas');

canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	if(player.power_ups >= 1){
		player.x = mousePos.x;
		player.y = mousePos.y;
		player.power_ups--;
		var audio = new Audio('sounds/teleport.wav');
		audio.play()
	}
}, false);


function init(){
	player = new Player();
	farBackground = new FarBackground();
	midBackgrounds = midBackgrounds.concat(new MidBackground());
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS!
}

function update(){
	game_time++;

	if(keys[key.space]&&lasers.length<1&&player.power_ups>=1) {
		lasers = lasers.concat(new Laser(player.x,player.y));
		player.power_ups--;
	}

	if(player.power_ups >= 10){
		game_won = true
	}

	if (Math.random()<=obstacle_spawn_rate){
		obstacles = obstacles.concat(new Obstacle());
	}

	if (Math.random()<=0.0005){
		powerUps = powerUps.concat(new PowerUp());
	}

	if (obstacle_spawn_rate <= 0.005){
		obstacle_spawn_rate += 0.00006
	}

	obstacles.forEach(function(obstacle) {
	    obstacle.update();

	    lasers.forEach(function(laser){
			if(collision(laser,obstacle)){
				obstacle.destroyed = true
			}
		});
	});

	lasers.forEach(function(laser){
		laser.update();
	});

	powerUps.forEach(function(powerUp) {
	    powerUp.update();
	});

	if (Math.random()<=0.0005){
		midBackgrounds = midBackgrounds.concat(new MidBackground());
	}
	midBackgrounds.forEach(function(midBackground) {
	    midBackground.update();
	});

	farBackground.update();

	player.update();


	//delete references to offscreen objects
	[powerUps,lasers,obstacles].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
		    if (list[i].cleanup()) {
		        list.splice(i--, 1);
		    }
		};
	});
}

function render(){
	// DONT'T DRAW THINGS HERE OR THEY'LL GET DRAWN BEHIND THE BACKGROUND!
	farBackground.draw();
	midBackgrounds.forEach(function(midBackground) {
	    midBackground.draw();
	});
	obstacles.forEach(function(obstacle) {
	    obstacle.draw();
	});
	powerUps.forEach(function(powerUp) {
	    powerUp.draw();
	});

	lasers.forEach(function(laser){
		laser.draw();
	});
	player.draw();
	for (i = 0; i < player.power_ups; i++) { 
		gameContext.drawImage(images[13],i*80,0);
	}
	for (i = 0; i < player.health-1; i++) { 
		gameContext.drawImage(images[12],i*45,height-images[12].height);
	}
}


function loop(){
	if (!game_over&&!game_won){
		requestAnimFrame(function(){
			loop();
		});
		update();
		render();
	}
	else if(game_over){
		show_game_over_screen();
	}
	else if(game_won){
		show_winning_screen();
	}
}

function show_winning_screen(){
		["#gameCanvas"].forEach(function(canvas){
			$(canvas).fadeOut(5000);
			farBackgroundContext.font = "bold 50px monaco";
			farBackgroundContext.fillStyle = "black";
			farBackgroundContext.fillText("You Win!",width/2-100,height/2);
			var audio = new Audio('sounds/win.wav');
			audio.play()
		});
};

function show_game_over_screen(){
	farBackgroundContext.font = "bold 50px monaco";
	farBackgroundContext.fillStyle = "black";
	farBackgroundContext.fillText("Game Over",(width/2)-165,(height/2)-90);
	farBackgroundContext.fillText("Retry?",(width/2)-125,(height/2)-40);
	var canvas = document.getElementById('playerCanvas');
	gameCanvas.addEventListener('click', function(evt) {
        location.reload();
	});
};



farBackgroundContext.font = "bold 50px monaco";
farBackgroundContext.fillStyle = "black";
farBackgroundContext.fillText("loading",width/2-100,height/2);

loadImages(["images/sprite100px.png","images/bkgd_strip1.png","images/floatcity500px.png","images/monster_150px.png","images/monster_200px.png","images/monster1_200px.png","images/monster1_125px.png","images/sprintmoving.png","images/sprintmoving10d.png","images/loot_100px.png","images/bkgd_strip2.png","images/bkgd_strip3.png","images/sprite50px.png","images/loot_50px.png"]);

checkImages();
