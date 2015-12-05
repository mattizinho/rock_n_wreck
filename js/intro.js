"use strict"

var introState = {
    preload: function(){
        this.game.load.image('intro', 'assets/sprites/intro.png')
        this.game.load.image('logo', 'assets/sprites/logo.png')
        this.game.load.image('play', 'assets/sprites/enter.png')
        this.game.load.image('credits', 'assets/sprites/c.png')
        this.game.load.image('controls', 'assets/sprites/o.png')

    },
    
    create: function(){
        
        this.game.add.sprite(0, 0, 'intro')
        this.game.add.sprite(100, 0, 'logo')
        this.game.add.sprite(200, 200, 'play')
        this.game.add.sprite(-30, 480, 'credits')
        this.game.add.sprite(410, 480, 'controls')

    },
    
    update: function(){
        if(this.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
           this.game.state.start('game');
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.C)){

           this.game.state.start('credits');
        }
        if(this.input.keyboard.isDown(Phaser.Keyboard.O)){

           this.game.state.start('controls');
        }
    }
}