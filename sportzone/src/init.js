var init = function(game){
};

init.prototype = {
	preload: function(){
          this.game.load.image("loading","https://pulpomarketing.com/sportzone/assets/loading.png");
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
		setTimeout(1000);

	}
}
