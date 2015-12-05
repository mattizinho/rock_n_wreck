"use strict"

var gameOverState = {
    preload: function(){
        this.game.load.image('intro', 'assets/sprites/gameoverbg2.png')
        this.game.load.image('gameover', 'assets/sprites/gameover.png')
    },
    
    create: function(){
        var style = {font: "65px Arial", fill: "#ff0000", align: "center"};
        this.game.add.sprite(0, 0, 'intro')
        this.game.add.sprite(100, 20, 'gameover')

//        this.game.add.text(230, 60, "Game Over", style);
//        this.game.add.text(80, 160, "Press ENTER to Retry", style);

    },
    
    update: function(){
        if(this.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
           this.game.state.start('intro');
        }
    }
}
//        this.game.load.audio('gameAudio', 'assets/audios/gamebg.mp3');
//        this.game.load.audio('jumpAudio', 'assets/audios/jump.mp3');
//        this.game.load.audio('shootAudio', 'assets/audios/shoot.mp3');