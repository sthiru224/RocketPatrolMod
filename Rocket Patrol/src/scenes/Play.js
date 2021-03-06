class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/pbutter.png');
        this.load.image('baby', './assets/baby.png');
        this.load.image('bread', './assets/bread.png');
        this.load.image('bgd', './assets/bgd.png');
        // load spritesheet
        this.load.spritesheet('splat', './assets/splat.png', {frameWidth: 72, frameHeight: 72, startFrame: 0, endFrame: 5});
        this.load.spritesheet('spread', './assets/spread.png', {frameWidth: 72, frameHeight: 72, startFrame: 0, endFrame: 3});
    }

    create(){
        this.sound.play('sfx_bgmusic'); 
        // place tile sprite
        this.bgd = this.add.tileSprite(0, 0, 640, 480, 'bgd').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 800080).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xee99e3).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xee99e3).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x89cFF0).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x89cFF0).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add babys (x3)
        this.ship01 = new Baby(this, game.config.width + borderUISize*6, borderUISize*4, 'baby', 0, 30).setOrigin(0, 0);
        this.ship02 = new Baby(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'baby', 0, 20).setOrigin(0,0);
        this.ship03 = new Baby(this, game.config.width, borderUISize*6 + borderPadding*4, 'baby', 0, 10).setOrigin(0,0);
        // add breads (x2)
        this.carb01 = new Bread(this, game.config.width + borderUISize*6, borderUISize*4, 'bread', 0, 50).setOrigin(0, 0);
        this.carb02 = new Bread(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bread', 0, 50).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('splat', { start: 0, end: 5, first: 0}),
            frameRate: 2
        });
        this.anims.create({
            key: 'explodebread',
            frames: this.anims.generateFrameNumbers('spread', { start: 0, end: 3, first: 0}),
            frameRate: 2
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Monaco',
            fontSize: '28px',
            backgroundColor: '#e9bfcd',
            color: '#e1084f',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //this.clock = this.time.delayedCall(1000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.sound.play('sfx_bgmusic');
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");  
        }
        this.bgd.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update babys (x3)
            this.ship02.update();
            this.ship03.update();
            this.carb01.update();           // update breads (x2)
            this.carb02.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.carb01)) {
            this.p1Rocket.reset();
            this.breadExplode(this.carb01);
        }
        if (this.checkCollision(this.p1Rocket, this.carb02)) {
            this.p1Rocket.reset();
            this.breadExplode(this.carb02);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        console.log("I AM HERE!!!!");
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'splat').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');       
    }
    breadExplode(carb) {
        // temporarily hide bread
        carb.alpha = 0;                         
        // create explosion sprite at bread's position
        let jam = this.add.sprite(carb.x, carb.y, 'spread').setOrigin(0, 0);
        jam.anims.play('explodebread');             // play explodebread animation
        jam.on('animationcomplete', () => {    // callback after ani completes
          carb.reset();                       // reset carb position
          carb.alpha = 1;                     // make carb visible again
          jam.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += carb.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_lather');       
    }
}