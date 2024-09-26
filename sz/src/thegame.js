var thegame = function(game){
    level = 1;
	vidas= 5;
	points = 0;
	snowBalls =[];
	presents=[];
	lives=[];
	corazones=[]
}

thegame.prototype ={
	create: function() {		
       this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
       this.game.touchControl.inputEnable();
            var _button1 = this.add.button(400, 80, 'buttons', function () {
                if (_button1.frame===1) {
                    _button1.frame = 3;
                    this.game.touchControl.settings.singleDirection = true;
                }else if (_button1.frame===3) {
                    _button1.frame = 1;
                    this.game.touchControl.settings.singleDirection = false;
                }
            }, this);
            _button1.frame=1;
            var _button2 = this.add.button(400, 20, 'buttons', function () {
                if (_button2.frame===2) {
                    _button2.frame = 0;
                    this.game.touchControl.inputEnable();
                }else if (_button2.frame===0) {
                    _button2.frame = 2;
                    this.game.touchControl.inputDisable();
                }
            }, this);
            _button2.frame=0;

		this.game.world.setBounds(x_world_init_bound, 0, x_world_finish_bound, screenHeight);

		//  We're going to be using physics, so enable the Arcade Physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.fondo = this.game.add.image(0, 00, 'bg');
		
		
		this.fondo1 = this.game.add.tileSprite(0, 
			this.game.height - this.game.cache.getImage('fondo1').height, 
			this.game.width, 
			this.game.cache.getImage('fondo1').height, 
			'fondo1'
		);
	 
		this.fondo2 = this.game.add.tileSprite(0, 
			this.game.height - this.game.cache.getImage('fondo2').height, 
			this.game.width, 
			this.game.cache.getImage('fondo2').height, 
			'fondo2'
		);
		
		this.fondo2.fixedToCamera=true;
		this.fondo1.fixedToCamera=true;
		this.fondo.fixedToCamera=true;
		
		game.music = this.add.audio('musicafondo');
		game.music.loop = true;
        game.music.stop();
		game.music.play();
		
		this.game.bolanievegolpe = this.game.add.audio('bolanievegolpe');
		this.vidaextra = this.game.add.audio('vidaextra');
		this.regalo = this.game.add.audio('regalo');
		
		//Corazones del marcador
		corazones[0] = this.game.add.sprite(10,20, 'vida');
		corazones[0].frame = 0;
		corazones[0].fixedToCamera = true;
		corazones[1] = this.game.add.sprite(60,20, 'vida');
		corazones[1].frame = 0;
		corazones[1].fixedToCamera = true;
		corazones[2] = this.game.add.sprite(110,20, 'vida');
		corazones[2].frame = 0;
		corazones[2].fixedToCamera = true;
		corazones[3] = this.game.add.sprite(160,20, 'vida');
		corazones[3].frame = 0;
		corazones[3].fixedToCamera = true;
		corazones[4] = this.game.add.sprite(210,20, 'vida');
		corazones[4].frame = 0;
		corazones[4].fixedToCamera = true;
		
		// The player and its settings
		this.player = this.game.add.sprite(32, this.game.world.height - 150, 'bicho');
		
		
			
		//  We need to enable physics on the player
		this.game.physics.arcade.enable(this.player);
		this.player.body.setSize(45,57, 10, 20);
		this.player.animations.add('paused', [10, 11, 12, 13, 14, 15, 16, 17, 18 , 19, 20, 21],10, true);
		this.player.animations.add('right', [23, 24, 25, 26, 27, 28, 29], 10, true);
		this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 10, true);
			
		
		

		//  Player physics properties. Give the little guy a slight bounce.
		this.player.body.bounce.y = 0.4;
		this.player.body.gravity.y = 000;
		this.player.body.collideWorldBounds = true;	
		
		var style = { font: "26px Arial", fill: "#ffffff"};  
		board = this.game.add.text(700, 20, points , style);
		board.setShadow(3, 3, 'rgba(0,0,0,0.6)', 2);
		board.fixedToCamera = true;			
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.createPresents(this.player.position.x, x_world_finish_bound);
		
		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
		
		//Nieve
		this.snowLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.createSnow, this);		

	},
	update: function(){		
        if (vidas === 0){this.game.state.start("gameOver",true,false,points);}
        
		//Con el objetivo de hacer el mundo infinito al llegar a menos de 1/4 del final lo acortamos una pantalla en el inicio y lo alargamos una pantalla en el final
		if (this.player.position.x > x_world_finish_bound - (screenWidth/2)){
			x_world_init_bound = x_world_init_bound + screenWidth;
			x_world_finish_bound = x_world_finish_bound + screenWidth;
			this.game.world.setBounds(x_world_init_bound, 0, x_world_finish_bound, screenHeight);
			this.createPresents(x_world_init_bound + screenWidth, x_world_finish_bound);
			this.createHearth(x_world_init_bound + screenWidth, x_world_finish_bound);
			level++;	
			this.game.time.events.remove(this.snowLoop);
			var mills = (1000 - (level * 30));
			if (mills<50) mills = 50;
			this.snowLoop = this.game.time.events.loop(mills, this.createSnow, this);	
		}
	//  Reset the players velocity (movement)
		if (this.player.body.velocity.x > 0){
			this.player.body.velocity.x = this.player.body.velocity.x -1;
		}else if (this.player.body.velocity.x < 0){
			this.player.body.velocity.x = this.player.body.velocity.x +1;
		}

		if (this.cursors.left.isDown || this.game.touchControl.cursors.left)
		{
			//  Move to the left
			this.player.body.velocity.x = -230;
			this.player.animations.play('left');
		}
        
		else if (this.cursors.right.isDown || this.game.touchControl.cursors.right)
		{
			//  Move to the right
			this.player.body.velocity.x = 230;
			this.player.animations.play('right');
		}else{
			this.player.animations.play('paused');
		}
		

		//  Allow the player to jump if they are touching the ground.
		if (this.cursors.up.isDown || this.game.touchControl.cursors.up)
		{
			this.player.body.velocity.y = -200;
		}        
        else if (this.cursors.down.isDown || this.game.touchControl.cursors.down)
		{
			//  Move to the right
			this.player.body.velocity.y = 200;
		}

		
		//Actualizamos las bolas
		for (var i = 0; i < snowBalls.length; i++){
			snowBalls[i].update();
		}
		
		
		//Chequeamos la recogida de regalos
		for (var i = 0; i < presents.length; i++){		
			if (presents[i].alive) {
				this.game.physics.arcade.collide(this.player, presents[i], this.presentCollisionHandler, false, this);			
			}
		}	

		//Chequeamos la recogida de vidas
		for (var i = 0; i < lives.length; i++){		
			if (lives[i].alive) {
				this.game.physics.arcade.collide(this.player, lives[i], this.livesCollisionHandler, false, this);			
			}
		}			
		
		
		this.fondo1.tilePosition.x = -(this.game.camera.x/6);
		this.fondo2.tilePosition.x = -(this.game.camera.x);
	},
	 
	
	createSnow: function(){		
		var position = this.game.rnd.integerInRange(x_world_init_bound, x_world_finish_bound);
		var velocity = this.game.rnd.integerInRange(250 + (25* level), 300 + (15* level));
		var snowBall = new SnowBall(0, this.game, this.player, position, 110, velocity);
		snowBalls.push(snowBall);		
	},
	
	createPresents: function(xinit, xfinish){
		var min_present_screen = 5;
		var max_present_screen = 10;
		var num_presents = this.game.rnd.integerInRange(min_present_screen,max_present_screen);
		for (var i=0; i<num_presents;i++){
			var y = this.game.rnd.integerInRange(10, screenHeight-40);
			var x = this.game.rnd.integerInRange(xinit, xfinish);
			var pres = this.game.add.sprite(x, y, 'regalo');
			this.game.physics.arcade.enable(pres);		
			pres.animations.add('shake');
			pres.animations.play('shake',10, true);
			presents.push(pres); 
		}
		
		
	},
	createHearth: function(xinit, xfinish){
		var create = this.game.rnd.integerInRange(1,10);
		if (create === 1){
			var y = this.game.rnd.integerInRange(10, screenHeight-40);
			var x = this.game.rnd.integerInRange(xinit, xfinish);
			var cor = this.game.add.sprite(x, y, 'corazon');
			cor.animations.add('shake');
			cor.animations.play('shake',10, true);
			lives.push(cor); 
			this.game.physics.arcade.enable(cor);	
		}			
	},		

	
	presentCollisionHandler: function(obj1,obj2){
		points= points + 50;
		board.setText(points);			
		this.regalo.play();
		obj2.kill();
	},
	livesCollisionHandler: function(obj1,obj2){
		if (obj2.alive){
			if (vidas<5) vidas++;
			this.updateLives(vidas);					
			this.vidaextra.play();
		}
		obj2.kill();
	},
	updateLives: function(vidas){

		for (var i=0; i<5; i++){
			if (i<vidas){
				corazones[i].frame=0;
			}else{
				corazones[i].frame=1;
			}
		}

	}
}


SnowBall = function (index, game, player, position, angle, velocity) {

    var x = position;
    var y = -100;

    this.game = game;  
    this.player = player;   
	this.crashed = false;

    this.snowball = game.add.sprite(position, y, 'bola_nieve');    
   
    game.physics.arcade.enable(this.snowball);
    //this.snowball.body.immovable = false;
    //this.snowball.body.collideWorldBounds = false;   	
	this.snowball.animations.add('flying', [0,1,2,3,4,5,6,7],20, true);
	this.snowball.animations.add('collide', [8,9,10,11,12,13],20, true);
	this.snowball.animations.play('flying');
    this.snowball.angle = angle;
	//this.snowball.body.gravity.y = 300;
	this.snowball.body.setSize(30,30,-75,25);

    game.physics.arcade.velocityFromRotation(this.snowball.rotation, velocity, this.snowball.body.velocity);
	
	this.snowball.events.onOutOfBounds.add(this.snowBallOut, this);
	

};

SnowBall.prototype.snowBallOut= function(snowball){
	snowball.destroy();
};

SnowBall.prototype.ballCollisionHandler= function(obj1,obj2){
    if (!this.crashed){
		this.game.bolanievegolpe.play();
		obj2.body.velocity.x=0;
		obj2.body.velocity.y=0;
		if (vidas>0) vidas--;
		this.updateLives(vidas);
		obj2.animations.play('collide',25, false, true);
		this.game.camera.flash(0xffffff, 100, true);	
        
	}
	this.crashed=true;
};


SnowBall.prototype.update = function() {
	if (this.snowball.alive) {				
		this.game.physics.arcade.collide(this.player, this.snowball, this.ballCollisionHandler, false, this);	
	}
};

SnowBall.prototype.updateLives = function(vidas) {
	for (var i=0; i<5; i++){
		if (i<vidas){
			corazones[i].frame=0;
		}else{
			corazones[i].frame=1;
		}
	}
}















