"use strict"

var creditsState = {
    preload: function(){
        this.game.load.image('intro', 'assets/sprites/creditsbg.png')
        this.game.load.image('back', 'assets/sprites/esc.png')
        this.game.load.image('studioLogo', 'assets/sprites/subscorpion.png')
        this.game.load.image('ueaLogo', 'assets/sprites/uea.png')

    },
    
    create: function(){

        this.game.add.sprite(0, 0, 'intro')
        this.game.add.sprite(200, 480, 'back')
        this.game.add.sprite(115, 505, 'ueaLogo')        
        var studio = this.game.add.sprite(0, 450, 'studioLogo')
        studio.scale.x = 0.6
        studio.scale.y = 0.6

},
    
    update: function(){
        if(this.input.keyboard.isDown(Phaser.Keyboard.ESC)){
           this.game.state.start('intro');
        }
    }
}