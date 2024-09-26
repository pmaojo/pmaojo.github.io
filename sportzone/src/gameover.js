var gameOver = function(game){}

gameOver.prototype = {
    	init: function(points){
        vidas = 5;
	},

    create: function(){
      var style = { font: "32px Arial", fill: "#ffffff"};
  		board = this.game.add.text(360, 210, points , style);
  		board.setShadow(3, 3, 'rgba(0,0,0,0.6)', 2);
  		board.fixedToCamera = true;
		this.game.world.setBounds(0, 0, screenWidth, screenHeight);
  		var gameOverTitle = this.game.add.sprite(400,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(560,320,"repetir",this.playTheGame,this);
        var compartirButton = this.game.add.button(240,320,"compartir",this.shareTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        compartirButton.anchor.setTo(0.5,0.5);

	},
	playTheGame: function(){
    points = 0;
    level = 1;
		this.game.state.start("Thegame");
	},
    shareTheGame: function(){

     FB.ui({
      method: 'share',
      mobile_iframe: true,
      quote: '¡He conseguido '+ points +' puntos en el juego de Navidad de Sport Zone! ¿Te atreves a batirme?',
      href: 'https://sportzone.es'
    }, function(response){});

    }

}
