var preload = function(game){}

preload.prototype = {
	preload: function(){ 
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
		this.game.load.image("gametitle","assets/gametitle2.png");
        this.game.load.image("repetir","assets/repetir.png");
        this.game.load.image("compartir","assets/compartir.png");
		this.game.load.image("comenzar","assets/comenzar.png");
		this.game.load.image("gameover","assets/gameover.png");
        this.game.load.image('bg', 'assets/fondo.png');    
		this.game.load.image('floor', 'assets/fondo2.png');    
		this.game.load.spritesheet('vida', 'assets/vidas.png', 50, 50);
		this.game.load.spritesheet('bicho', 'assets/bicho_10izq_10centro_10dcha.png', 60, 96);
		this.game.load.spritesheet('bola_nieve', 'assets/bola_vuela_rompe.png', 90, 91);
		this.game.load.spritesheet('regalo', 'assets/regalo.png', 60, 60);
		this.game.load.spritesheet('corazon', 'assets/corazon.png', 60, 96);
		this.game.load.image('fondo1', 'assets/fondo1.png');
		this.game.load.image('fondo2', 'assets/fondo2.png');
		this.game.load.audio('musicafondo',['assets/christmaszone.mp3','assets/christmaszone.ogg']);
		this.game.load.audio('bolanievegolpe',['assets/bolanievegolpe.wav','assets/bolanievegolpe.ogg']);
		this.game.load.audio('vidaextra',['assets/vidaextra.wav','assets/vidaextra.ogg']);
		this.game.load.audio('regalo',['assets/regalo.ogg']);		
        this.load.spritesheet('buttons', 'assets/buttons.png', 215, 41);
        this.load.image('compass', 'assets/compass_rose.png');
        this.load.image('touch_segment', 'assets/touch_segment.png');
        this.load.image('touch', 'assets/touch.png');


	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}