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


function init(){
	player = new Player();
	farBackground = new FarBackground();
	midBackground = new MidBackground();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS!
}

function update(){
	game_time++;
	console.log(game_time);

	if(game_time>=game_duration){
		game_won = true
	}

	if (Math.random()<=obstacle_spawn_rate){
		obstacles = obstacles.concat(new Obstacle());
	}

	if (obstacle_spawn_rate <= 0.005){
		obstacle_spawn_rate += 0.00006
	}

	obstacles.forEach(function(obstacle) {
	    obstacle.update();
	});

	farBackground.update();
	midBackground.update();
	player.update();
}

function render(){

	farBackground.draw();
	midBackground.draw();
	obstacles.forEach(function(obstacle) {
	    obstacle.draw();
	});
	player.draw();
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

loadImages(["images/sprite100px.png","images/bkgd_strip1.png","images/floatcity500px.png","images/floatcity125px.png"]);

checkImages();
