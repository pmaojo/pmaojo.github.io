(function (global, doc) {
    'use strict';

    var SCREEN_WIDTH = 800;
    var SCREEN_HEIGHT = 420;

    global.x_world_init_bound = 0;
    global.screenWidth = SCREEN_WIDTH;
    global.screenHeight = SCREEN_HEIGHT;
    global.x_world_finish_bound = 2 * SCREEN_WIDTH;
    global.snowBalls = [];
    global.presents = [];
    global.lives = [];
    global.corazones = [];
    global.debug = false;
    global.points = 0;
    global.level = 1;
    global.vidas = 1;
    global.livesBoard = null;
    global.board = null;

    var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.CANVAS, 'game');
    game.state.add('Init', init);
    game.state.add('Preload', preload);
    game.state.add('GameTitle', gameTitle);
    game.state.add('Thegame', thegame);
    game.state.add('gameOver', gameOver);
    game.state.start('Init');

    function focusGame() {
        var container = doc.getElementById('game');
        if (container && typeof container.focus === 'function') {
            container.focus();
        }
    }

    function restartGame() {
        game.state.start('Init');
    }

    var api = Object.freeze({
        game: game,
        restart: restartGame,
        focus: focusGame
    });

    global.SportzoneGame = api;
    global.game = game;
    global.restartGame = restartGame;
}(window, document));
