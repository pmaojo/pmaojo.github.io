/* global SportzoneGameAssets */
var preload = function (game) {};

preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);

        var resolve = SportzoneGameAssets.resolve;
        var resolveMany = SportzoneGameAssets.resolveMany;

        this.game.load.image("gametitle", resolve('gametitle2.png'));
        this.game.load.image("repetir", resolve('repetir_pt.png'));
        this.game.load.image("comenzar", resolve('comenzar_pt.png'));
        this.game.load.image("gameover", resolve('gameover_pt.png'));
        this.game.load.image('bg', resolve('fondomin.png'));
        this.game.load.image('floor', resolve('fondo2min.png'));
        this.game.load.spritesheet('vida', resolve('vidas.png'), 50, 50);
        this.game.load.spritesheet('bicho', resolve('bicho_10izq_10centro_10dcha.png'), 60, 96);
        this.game.load.spritesheet('bola_nieve', resolve('bola_vuela_rompe.png'), 90, 91);
        this.game.load.spritesheet('regalo', resolve('regalo.png'), 60, 60);
        this.game.load.spritesheet('corazon', resolve('corazon.png'), 60, 96);
        this.game.load.image('fondo1', resolve('fondo1min.png'));
        this.game.load.image('fondo2', resolve('fondo2min.png'));
        this.game.load.audio('musicafondo', resolveMany(['christmaszone.ogg', 'christmaszone.mp3']));
        this.game.load.audio('bolanievegolpe', resolveMany(['bolanievegolpe.ogg', 'bolanievegolpe.wav']));
        this.game.load.audio('vidaextra', resolveMany(['vidaexrtra.ogg', 'vidaextra.wav']));
        this.game.load.audio('regalo', resolveMany(['regalo.ogg']));
        this.load.spritesheet('buttons', resolve('buttons.png'), 215, 41);
        this.load.image('compass', resolve('compass_rose.png'));
        this.load.image('touch_segment', resolve('touch_segment.png'));
        this.load.image('touch', resolve('touch.png'));
    },
    create: function () {
        this.game.state.start("GameTitle");
    }
};
