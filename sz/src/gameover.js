var gameOver = function(game){}
 
gameOver.prototype = {
    	init: function(points){
        vidas = 5;
        FB.api('/me', {fields: 'name,email'}, function(response) {
         $.ajax({
          type: 'POST',
         // 213.32.68.107       
         // 0.0.0.0:3000      
          url: "http://213.32.68.107/jugadas.json",
           dataType: "json",
           data: {
              jugada: {
              name: response.name,
              email: response.email,
              puntos: points
            }
          },           
          success: function(data) {
           return false;
          },
          error: function(data) {
            return false;
          }
        });})
	},
  	
    create: function(){
  		var gameOverTitle = this.game.add.sprite(400,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(560,320,"repetir",this.playTheGame,this);
        var compartirButton = this.game.add.button(240,320,"compartir",this.shareTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        compartirButton.anchor.setTo(0.5,0.5);

	},
	playTheGame: function(){
		this.game.state.start("Thegame");
	},
    shareTheGame: function(){

     FB.ui({
      method: 'share',
      mobile_iframe: true,
      quote: '¡He conseguido '+ points +' puntos en el juego de SportZone!',
      href: 'https://sportzone.es'
    }, function(response){});

    }

}