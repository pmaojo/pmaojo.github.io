var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var gameTitle = this.game.add.sprite(160,90,"gametitle");
		gameTitle.anchor.setTo(-0.37,0.2);
		var playButton = this.game.add.button(160,320,"comenzar",this.playTheGame,this);
		playButton.anchor.setTo(-0.3,0.5);
	},
	playTheGame: function(){
		 FB.api('/me', {
        fields: 'name,email'
    }, function(response) {  jQuery.ajax({
          type: 'POST',
          url: "https://213.32.68.107/jugadas.json",
           dataType: "json",
           data: {
              jugada: {
              name: response.name,
              email: response.email,
              country: "Portugal"
            }
          },
          success: function(data) {
           return false;
          },
          error: function(data) {
            return false;
          }
        })});
		this.game.state.start("Thegame");
	}
}
