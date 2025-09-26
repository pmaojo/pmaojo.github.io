var gameOver = function (game) {};

gameOver.prototype = {
    init: function (pointsValue) {
        vidas = 5;
    },

    create: function () {
        var style = { font: "32px Arial", fill: "#ffffff" };
        board = this.game.add.text(360, 210, points, style);
        board.setShadow(3, 3, 'rgba(0,0,0,0.6)', 2);
        board.fixedToCamera = true;
        this.game.world.setBounds(0, 0, screenWidth, screenHeight);
        var gameOverTitle = this.game.add.sprite(400, 160, "gameover");
        gameOverTitle.anchor.setTo(0.5, 0.5);
        var playButton = this.game.add.button(560, 320, "repetir", this.playTheGame, this);
        playButton.anchor.setTo(0.5, 0.5);
    },
    playTheGame: function () {
        points = 0;
        level = 1;
        this.game.state.start("Thegame");
    }
};
