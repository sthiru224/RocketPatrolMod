let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//////// EXPLANATION AND MODS ////////
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//Create a new title screen (e.g., new artwork, typography, layout) (10)
//Add your own (copyright-free) background music to the Play scene (5)
//Replace the UI borders with new artwork (10)
//Create a new scrolling tile sprite for the background (5)
// Many of these are overlapping mods though 
// Referencing the peanut butter baby meme and changed the sounds and animations based on the theme/aesthetics