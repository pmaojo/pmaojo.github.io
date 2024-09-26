var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var gameTitle = this.game.add.sprite(160,90,"gametitle");
		gameTitle.anchor.setTo(-0.37,0.2);
		var playButton = this.game.add.button(160,320,"comenzar",this.playTheGame,this);
		playButton.anchor.setTo(-0.3,0.5);
	},
	playTheGame: function(){
		this.game.state.start("Thegame");
	}
}
