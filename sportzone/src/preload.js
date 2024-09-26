var preload = function(game){}

preload.prototype = {
	preload: function(){



          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
		this.game.load.image("gametitle","https://pulpomarketing.com/sportzone/assets/gametitle2.png");
        this.game.load.image("repetir","https://pulpomarketing.com/sportzone/assets/repetir.png");
        this.game.load.image("compartir","https://pulpomarketing.com/sportzone/assets/compartir.png");
		this.game.load.image("comenzar","https://pulpomarketing.com/sportzone/assets/comenzar.png");
		this.game.load.image("gameover","https://pulpomarketing.com/sportzone/assets/gameover.png");
        this.game.load.image('bg', 'https://pulpomarketing.com/sportzone/assets/fondomin.png');
		this.game.load.image('floor', 'https://pulpomarketing.com/sportzone/assets/fondo2min.png');
		this.game.load.spritesheet('vida', 'https://pulpomarketing.com/sportzone/assets/vidas.png', 50, 50);
		this.game.load.spritesheet('bicho', 'https://pulpomarketing.com/sportzone/assets/bicho_10izq_10centro_10dcha.png', 60, 96);
		this.game.load.spritesheet('bola_nieve', 'https://pulpomarketing.com/sportzone/assets/bola_vuela_rompe.png', 90, 91);
		this.game.load.spritesheet('regalo', 'https://pulpomarketing.com/sportzone/assets/regalo.png', 60, 60);
		this.game.load.spritesheet('corazon', 'https://pulpomarketing.com/sportzone/assets/corazon.png', 60, 96);
		this.game.load.image('fondo1', 'https://pulpomarketing.com/sportzone/assets/fondo1min.png');
		this.game.load.image('fondo2', 'https://pulpomarketing.com/sportzone/assets/fondo2min.png');
		this.game.load.audio('musicafondo',['https://pulpomarketing.com/sportzone/assets/christmaszone.ogg']);
		this.game.load.audio('bolanievegolpe',['https://pulpomarketing.com/sportzone/assets/bolanievegolpe.ogg']);
		this.game.load.audio('vidaextra',['https://pulpomarketing.com/sportzone/assets/vidaexrtra.ogg']);
		this.game.load.audio('regalo',['https://pulpomarketing.com/sportzone/assets/regalo.ogg']);
        this.load.spritesheet('buttons', 'https://pulpomarketing.com/sportzone/assets/buttons.png', 215, 41);
        this.load.image('compass', 'https://pulpomarketing.com/sportzone/assets/compass_rose.png');
        this.load.image('touch_segment', 'https://pulpomarketing.com/sportzone/assets/touch_segment.png');
        this.load.image('touch', 'https://pulpomarketing.com/sportzone/assets/touch.png');


	},
  	create: function(){

		this.game.state.start("GameTitle");
	}
}
// musicafondo.ogg https://drive.google.com/uc?export=download&id=0B8F8i9yRQEbrVi1CQm9FM3JvVUU
// bolanievegolpe.ogg https://drive.google.com/uc?export=download&id=0B8F8i9yRQEbrRXVsZkNWb3BMVUU
// vidaextra.ogg https://drive.google.com/uc?export=download&id=0B8F8i9yRQEbrdTNGU0VJOGphQms
// regalo.ogg https://drive.google.com/uc?export=download&id=0B8F8i9yRQEbrcE9xMmVTck5wUUE