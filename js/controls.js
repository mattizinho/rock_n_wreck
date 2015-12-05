"use strict"

var controlsState = {
    preload: function(){
        this.game.load.image('intro', 'assets/sprites/intro.png')
        this.game.load.image('back', 'assets/sprites/esc.png')
        this.game.load.image('logo', 'assets/sprites/controlsbg.png')

    },
    
    create: function(){

//        this.game.add.sprite(0, 0, 'intro')
        this.game.add.sprite(0, 0, 'logo')
        this.game.add.sprite(430, 480, 'back')

},
    
    update: function(){
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC)){
           this.game.state.start('intro');
        }
    }
}