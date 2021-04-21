class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/babyhit.wav');
        this.load.audio('sfx_lather', './assets/lather.wav');
        this.load.audio('sfx_rocket', './assets/pbrelease.wav');
        this.load.audio('sfx_bgmusic', './assets/bgm.wav');
        this.load.image('pbpic', './assets/PBpic.png');
        this.load.image('BABE', './assets/splat.png');
        this.load.image('saying', './assets/saying.png');
    }

    create(){
      this.add.rectangle(0, 0, 640, 480, 0x7a9f98).setOrigin(0, 0); //right
        // display score
        let menuConfig = {
            fontFamily: 'Monaco',
            fontSize: '20px',
            backgroundColor: '#B19CD9',
            color: '#89cFF0',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PEANUT BUTTER BABY!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFC0CB';
        menuConfig.color = '#f34183';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        // borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x89cFF0).setOrigin(0, 0); //top
        this.add.rectangle(0, 0, game.config.width, borderUISize/2, 0xee99e3).setOrigin(0, 0); //top

        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x89cFF0).setOrigin(0, 0); //bottom
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width/2, borderUISize, 0xee99e3).setOrigin(0, 0); //bottom

        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x89cFF0).setOrigin(0, 0); //left
        this.add.rectangle(0, 0, borderUISize/2, game.config.height, 0xee99e3).setOrigin(0, 0); //left

        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x89cFF0).setOrigin(0, 0); //right
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize/2, game.config.height, 0xee99e3).setOrigin(0, 0); //right
        
        //peanuts
        var f = this.add.sprite(120,100,"pbpic");
        f.rotation = 1.7;
        f = this.add.sprite(500,100,"pbpic");
        var s = this.add.sprite(320,400,"BABE");
        this.add.sprite(400,370,"saying");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            babySpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            babySpeed: 4,
            breadSpeed: 8,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}