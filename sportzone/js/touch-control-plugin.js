(function (global, Phaser) {
    'use strict';

    if (!Phaser || !Phaser.Plugin) {
        return;
    }

    Phaser.Plugin.TouchControl = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);
        this.input = this.game.input;

        this.imageGroup = [];
        this.imageGroup.push(this.game.add.sprite(0, 0, 'compass'));
        this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'));
        this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'));
        this.imageGroup.push(this.game.add.sprite(0, 0, 'touch'));

        this.imageGroup.forEach(function (sprite) {
            sprite.anchor.set(0.5);
            sprite.visible = false;
            sprite.fixedToCamera = true;
        });
    };

    Phaser.Plugin.TouchControl.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.TouchControl.prototype.constructor = Phaser.Plugin.TouchControl;

    Phaser.Plugin.TouchControl.prototype.settings = {
        maxDistanceInPixels: 200,
        singleDirection: false
    };

    Phaser.Plugin.TouchControl.prototype.cursors = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    Phaser.Plugin.TouchControl.prototype.speed = {
        x: 0,
        y: 0
    };

    Phaser.Plugin.TouchControl.prototype.inputEnable = function () {
        this.input.onDown.add(createCompass, this);
        this.input.onUp.add(removeCompass, this);
    };

    Phaser.Plugin.TouchControl.prototype.inputDisable = function () {
        this.input.onDown.remove(createCompass, this);
        this.input.onUp.remove(removeCompass, this);
    };

    var initialPoint;

    var createCompass = function () {
        this.imageGroup.forEach(function (sprite) {
            sprite.visible = true;
            sprite.bringToTop();
            sprite.cameraOffset.x = this.input.worldX;
            sprite.cameraOffset.y = this.input.worldY;
        }, this);

        this.preUpdate = setDirection.bind(this);
        initialPoint = this.input.activePointer.position.clone();
    };

    var removeCompass = function () {
        this.imageGroup.forEach(function (sprite) {
            sprite.visible = false;
        });

        this.cursors.up = false;
        this.cursors.down = false;
        this.cursors.left = false;
        this.cursors.right = false;

        this.speed.x = 0;
        this.speed.y = 0;

        this.preUpdate = empty;
    };

    var empty = function () {
    };

    var setDirection = function () {
        var distance = initialPoint.distance(this.input.activePointer.position);
        var maxDistance = this.settings.maxDistanceInPixels;

        var deltaX = this.input.activePointer.position.x - initialPoint.x;
        var deltaY = this.input.activePointer.position.y - initialPoint.y;

        if (this.settings.singleDirection) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                deltaY = 0;
                this.input.activePointer.position.y = initialPoint.y;
            } else {
                deltaX = 0;
                this.input.activePointer.position.x = initialPoint.x;
            }
        }

        var angle = initialPoint.angle(this.input.activePointer.position);

        if (distance > maxDistance) {
            deltaX = (deltaX === 0) ? 0 : Math.cos(angle) * maxDistance;
            deltaY = (deltaY === 0) ? 0 : Math.sin(angle) * maxDistance;
        }

        this.speed.x = parseInt((deltaX / maxDistance) * 100 * -1, 10);
        this.speed.y = parseInt((deltaY / maxDistance) * 100 * -1, 10);

        this.cursors.up = (deltaY < 0);
        this.cursors.down = (deltaY > 0);
        this.cursors.left = (deltaX < 0);
        this.cursors.right = (deltaX > 0);

        this.imageGroup.forEach(function (sprite, index) {
            sprite.cameraOffset.x = initialPoint.x + (deltaX) * index / 3;
            sprite.cameraOffset.y = initialPoint.y + (deltaY) * index / 3;
        }, this);
    };

    Phaser.Plugin.TouchControl.prototype.preUpdate = empty;

}(window, window.Phaser));
