"use strict";

// Estado: Cada segmento do jogo (e.g. fase, tela, etc) é representado por um estado
var gameState = {
 
    preload: function(){   
        this.game.load.spritesheet('player', 'assets/sprites/teste3.png', 76.5, 102, 4);
        this.game.load.image('bg', 'assets/sprites/contraStage.png');
        this.game.load.image('enemy', 'assets/sprites/enemy.png');
        this.game.load.image('platform', 'assets/sprites/platform.png');
        this.game.load.image('wallPlatform', 'assets/sprites/platform2.png');
        this.game.load.image('bullet', 'assets/sprites/bola.png');
        this.game.load.image('enemyBullet', 'assets/sprites/bola2.png');
        this.game.load.image('groundCollisor', 'assets/sprites/bola2.png');
        this.game.load.image('boss', 'assets/sprites/boss.png');
        this.game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 241, 198, 6);
        this.game.load.image('life', 'assets/sprites/gun.png', 241, 198, 6);
        this.game.load.image('bosslife', 'assets/sprites/bossHealthBar.png');

//        this.game.load.audio('gameAudio', 'assets/audios/gamebg.mp3');
//        this.game.load.audio('jumpAudio', 'assets/audios/jump.mp3');
//        this.game.load.audio('shootAudio', 'assets/audios/shoot.mp3');
    },
    
    create: function(){
        this.game.world.resize(7200, 600);
        
        this.nextFire = 0;
        this.fireRate = 300;
        this.bossOn=false;
        
        this.playerHealth = 2;
        this.style = {font: "65px Arial", fill: "#ff0000", align: "center"};
        this.invunerable = false
        
        this.bossMove = 0
        this.bossHealth = 30
        this.isAlive = true
        
        this.groundCollisor = this.game.add.group();
        this.game.physics.enable(this.groundCollisor);
        
        this.groundCollisor.enableBody = true;
        
        this.groundCollisor.create(200, this.game.world.height - 63,'groundCollisor');
        this.groundCollisor.create(1400,this.game.world.height - 63,'groundCollisor');
        this.groundCollisor.create(3500,this.game.world.height - 63,'groundCollisor');
        this.groundCollisor.create(6600,this.game.world.height - 63,'groundCollisor');
        this.groundCollisor.create(370,420,'groundCollisor');
        this.groundCollisor.create(700,420,'groundCollisor');
        this.groundCollisor.create(570,170,'groundCollisor');
        this.groundCollisor.create(900,170,'groundCollisor');
        this.groundCollisor.create(970,220,'groundCollisor');
        this.groundCollisor.create(1300,220,'groundCollisor');
        
        this.groundCollisor.create(3470,120,'groundCollisor');
        this.groundCollisor.create(3800,120,'groundCollisor');
        this.groundCollisor.create(2970,120,'groundCollisor');
        this.groundCollisor.create(3300,120,'groundCollisor');
        this.groundCollisor.create(3970,120,'groundCollisor');
        this.groundCollisor.create(4300,120,'groundCollisor');
        this.groundCollisor.create(4970,320,'groundCollisor');
        this.groundCollisor.create(5300,320,'groundCollisor');

        this.right = true
        
        
//        this.bgAudio = this.game.add.audio('gameAudio')
//        this.jumpAudio = this.game.add.audio('jumpAudio')
//        this.shootAudio = this.game.add.audio('shootAudio')
        
        
        this.game.add.sprite(0, 0, 'bg');
        
//        this.bgAudio.volume -= 0.5;
//        this.jumpAudio.volume += 0.5;
//        this.shootAudio.volume += 0.5;
        
//        this.bgAudio.play();
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.lifes = this.game.add.group();
        
        for(var i=2; i>=0; i--){
            this.life = this.lifes.create(i*120, 10, 'life')
            this.life.fixedToCamera = true
        }
        
        this.bossBar = this.game.add.group();
        
        for(var i=this.bossHealth; i>=1; i--){
            this.bossHealthBar = this.bossBar.create(i*20, 80, 'bosslife');   
            this.bossHealthBar.fixedToCamera = true;
        }
        
        this.bossBar.visible = false;
        
        this.game.physics.arcade.gravity.y = 800;
        
        this.player = this.game.add.sprite(10, 100, 'player')
        
        this.explosion = this.game.add.sprite(999999, 99999, 'explosion')
        this.explosion.animations.add('explode', [0,1,2,3,4,5])
        
        this.explosion2 = this.game.add.sprite(999999, 99999, 'explosion')
        this.explosion2.animations.add('explode2', [0,1,2,3,4,5])

        this.explosion3 = this.game.add.sprite(999999, 99999, 'explosion')
        this.explosion3.animations.add('explode3', [0,1,2,3,4,5])

        
        this.player.anchor.setTo(0.5, 0.5);
        
        this.boss = this.game.add.sprite(9999999, 99999999, 'boss');
        this.game.physics.enable(this.boss);
//        this.boss.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(this.player);
        
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add('walk', [0,1,2,3], 6);
//        this.player.animations.add('jump', [4]);
//        this.player.animations.add('fall', [6]);
//        this.player.animations.add('idle', [5]);
//        this.player.animations.add('shoot', [3]);
//        this.player.animations.add('death', [7]);
        
        this.game.camera.follow(this.player);
                
        this.ground = this.game.add.group();
        this.game.physics.enable(this.ground)
        
        this.game.time.events.loop(2500, this.createEnemy, this);       
                
        this.floatPlatforms = this.game.add.group();
        this.game.physics.enable(this.floatPlatforms);
        
        this.wallPlatforms = this.game.add.group();
        this.game.physics.enable(this.wallPlatforms);
        
//        this.wallPlatforms.visible = false;
        
        this.bullets = this.game.add.group();
        this.bullets.allowGravity = false;
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        
        this.enemies = this.game.add.group();
        this.game.physics.enable(this.enemies);
        this.enemies.setAll('checkWorldBounds', true);
        this.enemies.setAll('outOfBoundsKill', true);
        
        this.floatEnemies = this.game.add.group();
        this.game.physics.enable(this.floatEnemies);
        
        this.enemyBullets = this.game.add.group();
        this.game.physics.enable(this.enemyBullets);

        this.ground.enableBody = true;
        this.floatPlatforms.enableBody = true;
        this.wallPlatforms.enableBody = true;
        this.enemies.enableBody = true;
        this.enemyBullets.enableBody = true;
        this.floatEnemies.enableBody = true;
        this.bullets.enableBody = true;
        this.boss.enableBody = true;
        

        this.floatEnemies.create(550, 350, 'enemy');
        this.floatEnemies.create(750, 100, 'enemy');
        this.floatEnemies.create(1150, 150, 'enemy');
        this.floatEnemies.create(3150, 50, 'enemy');
        this.floatEnemies.create(3650, 50, 'enemy');
        this.floatEnemies.create(4150, 50, 'enemy');
        this.floatEnemies.create(5150, 250, 'enemy');

//        this.floatEnemies.body.velocity = 100
        this.floatEnemiesWalk();
        
        for(var i=0; i<24; i++){
            this.ground.create(i*300,this.game.world.height - 30, 'platform')
        }
        
        this.floatPlatforms.create(80,300,'platform');
        this.floatPlatforms.create(400,450,'platform');
        this.floatPlatforms.create(600,200,'platform');
        this.floatPlatforms.create(1000,250,'platform');
        this.floatPlatforms.create(3000,150,'platform');
        this.floatPlatforms.create(3500,150,'platform');
        this.floatPlatforms.create(4000,150,'platform');
        this.floatPlatforms.create(5000,350,'platform');

        

        this.ground.setAll('body.immovable', true);
        this.ground.setAll('body.moves', false);
        
        this.groundCollisor.setAll('body.immovable', true);
        this.groundCollisor.setAll('body.moves', false);
        
        this.floatPlatforms.setAll('body.immovable', true);
        this.floatPlatforms.setAll('body.moves', false);
        
        
//        this.wallPlatforms.create(6500,-400,'wallPlatform')
        
        
        
        this.keys = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    },
    
    update: function(){
        this.wallPlatforms.setAll('body.immovable', true);
        this.wallPlatforms.setAll('body.moves', false);
        
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player, this.floatPlatforms);
        this.game.physics.arcade.collide(this.player, this.wallPlatforms);
        this.game.physics.arcade.collide(this.enemies, this.ground);
        this.game.physics.arcade.collide(this.wallPlatforms, this.ground);
        this.game.physics.arcade.collide(this.enemies, this.floatPlatforms);
        this.game.physics.arcade.collide(this.floatEnemies, this.floatPlatforms);
        this.game.physics.arcade.collide(this.groundCollisor, this.ground);
        this.game.physics.arcade.collide(this.boss, this.ground);
        this.game.physics.arcade.collide(this.boss, this.floatPlatforms);
        this.game.physics.arcade.collide(this.boss, this.wallPlatforms);
        this.game.physics.arcade.overlap(this.enemies, this.groundCollisor, this.groundCollision, null, this);
        this.game.physics.arcade.overlap(this.floatEnemies, this.groundCollisor, this.floatEnemiesCollideWithBounds, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.floatEnemies, this.bulletHitEnemy, null, this);
        this.game.physics.arcade.overlap(this.bullets, this.boss, this.bossLife, null, this);
        if(!this.invunerable){
            this.game.physics.arcade.overlap(this.enemies, this.player, this.enemyHitPlayer, null, this);
//          this.game.physics.arcade.collide(this.boss, this.player, this.enemyHitPlayer);
            this.game.physics.arcade.overlap(this.floatEnemies, this.player, this.enemyHitPlayer, null, this);
            this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitPlayer, null, this);
        }
        
        for(var i=0; i<this.enemyBullets.length; i++){

            
        }
        this.player.body.velocity.x = 0;
        if(this.keys.left.isDown){
            if(this.isAlive){
                if(this.player.scale.x == 1){ this.player.scale.x = -1}
                if(!this.fire.isDown){
                    this.player.body.velocity.x = -250;
                    this.player.animations.play('walk');
        }}}
        else if(this.keys.right.isDown){
            if(this.isAlive){
                if(this.player.scale.x == -1){ this.player.scale.x = 1}
                if(!this.fire.isDown){
                    this.player.body.velocity.x = 250;
                    this.player.animations.play('walk');
        }}}
        
        
        else if(this.fire.isDown){
            if(this.isAlive){
//                this.player.animations.play('shoot')
        }}
        else{
            if(this.isAlive){
//                this.player.animations.play('idle')
        }}
        
        if(this.fire.isDown){
            if(this.isAlive){
                this.bulletFire()
        }}
        
        if((this.jumpButton.isDown) && this.player.body.touching.down){
            if(this.isAlive){
                this.player.body.velocity.y = -500;
//              this.jumpAudio.play();
        }}
        
        if(!this.player.body.touching.down){
            if(!this.fire.isDown){
//                this.player.animations.play('jump');
            }
        }
        
        if(this.player.x >= 6700 &&!this.bossOn){
            this.game.camera.x = 6800
            this.game.camera.follow(null)
            this.game.time.events.add(500, this.bossCreate, this)
            this.game.time.events.loop(2500, this.bossAct, this)
            this.bossOn = true;
            this.bossBar.visible = true;
        }
    },
    
    createEnemy: function() {
        
        if(this.player.x > 350 && this.player.x < 6200){
            if(this.right){
                var enemy = this.enemies.create(this.game.camera.x + this.game.camera.width + 10, 500, 'enemy')
                enemy.body.velocity.x = -400;
            }
        
            if(!this.right){
                var enemy = this.enemies.create(this.game.camera.x - 10, 500, 'enemy');
                enemy.body.velocity.x = 400;
              }
            }
        
        if(this.right == true){this.right = false}
        else if (this.right == false){this.right = true}
    },
    
    floatEnemiesWalk: function() {
        
        for(var i = 0; i<this.floatEnemies.length; i++){
            var enemy = this.floatEnemies.children[i]
            
            enemy.body.velocity.x = 100
        }
    },
    
    floatEnemiesCollideWithBounds: function(floatEnemy) {
        
        if(floatEnemy.body.touching.right){
            floatEnemy.body.velocity.x = -100
            this.enemyBullets.create(floatEnemy.x, floatEnemy.y, 'enemyBullet')
        }
        if(floatEnemy.body.touching.left){
            floatEnemy.body.velocity.x = 100
            this.enemyBullets.create(floatEnemy.x, floatEnemy.y, 'enemyBullet')
        }
    },
    
    bossCreate: function() {
        
        var wall = this.wallPlatforms.create(6390, -330, 'wallPlatform');  
        var wall = this.wallPlatforms.create(7180, -330, 'wallPlatform');
        this.boss.x = 7070
        this.boss.y = -200
        this.boss.anchor.setTo(0.5, 0.5);
    },
    
    bossAct: function(boss){
        
        for(var i=0; i<this.boss.length; i++){
            var boss = this.boss.children[i]
        }
        this.bossMove += 1
        if(this.bossMove == 11){this.bossMove = 1}
        
        this.boss.scale.x = 1
        this.boss.anchor.setTo(0.5, 0.5);
        
        if(this.boss.alive){
            if(this.bossMove == 1 || this.bossMove == 2 || this.bossMove == 6){
                bullets = this.enemyBullets.create(this.boss.x, this.boss.y + 15, 'enemyBullet')
                var bullets2 = this.enemyBullets.create(this.boss.x, this.boss.y + 15, 'enemyBullet')
                var bullets3 = this.enemyBullets.create(this.boss.x, this.boss.y + 15, 'enemyBullet')
                bullets.body.allowGravity = false;
                bullets2.body.allowGravity = false;
                bullets3.body.allowGravity = false;
                bullets.body.velocity.x = -300
                bullets2.body.velocity.x = -300
                bullets2.body.velocity.y = -120
                bullets3.body.velocity.x = -300
                bullets3.body.velocity.y = 120

            }

            if(this.bossMove == 4 || this.bossMove == 8 || this.bossMove == 9){
                var bullets = this.enemyBullets.create(this.boss.x, this.boss.y + 30, 'enemyBullet')
                var bullets2 = this.enemyBullets.create(this.boss.x, this.boss.y, 'enemyBullet')
                var bullets3 = this.enemyBullets.create(this.boss.x, this.boss.y - 30, 'enemyBullet')
                bullets.body.allowGravity = false;
                bullets2.body.allowGravity = false;
                bullets3.body.allowGravity = false;
                bullets.body.velocity.x = 600
                bullets2.body.velocity.x = 500
                bullets3.body.velocity.x = 200
                this.boss.scale.x = -1
            }

            if(this.bossMove == 3){
                this.boss.body.velocity.y = -800
                this.boss.body.velocity.x = -300
                this.boss.scale.x = -1
            }

            if(this.bossMove == 10){
                this.boss.body.velocity.y = -800
                this.boss.body.velocity.x = 300
                this.boss.scale.x = 1
            }

            if(this.bossMove == 5){
                this.boss.body.velocity.x = 500
                this.boss.scale.x = -1
            }

            if(this.bossMove == 7){
                this.boss.body.velocity.x = -500
                this.boss.scale.x = 1
            }
        }
    },

    bossLife: function(boss, bullet) {
        
        bullet.kill();
        this.bossHealth -= 1
        var bossLife = this.bossBar.getFirstAlive()
        bossLife.kill()
        if(this.bossHealth <= 0){
            this.bossMove = 11
            boss.kill()
            this.game.time.events.repeat(1000, 5, this.explosions, this)
            this.game.time.events.add(6000,this.explosionGone, this)
        }
    },
    
    explosions: function() {
     
        this.explosion.x = this.game.rnd.integerInRange(6400, 7000); this.explosion.y = this.game.rnd.integerInRange(50, 400)
        this.explosion2.x = this.game.rnd.integerInRange(6400, 7000); this.explosion2.y = this.game.rnd.integerInRange(50, 400)
        this.explosion3.x = this.game.rnd.integerInRange(6400, 7000); this.explosion3.y = this.game.rnd.integerInRange(50, 400)
        this.explosion.animations.play('explode', 6, true)
        this.explosion2.animations.play('explode2', 6, true)
        this.explosion3.animations.play('explode3', 6, true)

    },
    
    explosionGone: function() {
//        this.game.time.events.stop(this.bossAct)
        this.explosion.x = 99999; this.explosion.y = 9999999
        this.explosion2.x = 99999; this.explosion2.y = 9999999
        this.explosion3.x = 99999; this.explosion3.y = 9999999
        this.wallPlatforms.removeAll()
        this.game.camera.follow(this.player)
    },
    
    bulletFire: function() {
        if(game.time.now > this.nextFire){
            this.nextFire = game.time.now + this.fireRate;
            if(this.player.scale.x == 1){
                var bullet = this.bullets.create(this.player.x+30, this.player.y, 'bullet');
                bullet.body.allowGravity = false
                bullet.body.velocity.x = 400
            }
            if(this.player.scale.x == -1){
                var bullet = this.bullets.create(this.player.x-60, this.player.y, 'bullet');
                bullet.body.allowGravity = false;
                bullet.body.velocity.x = -400
            }
//        this.player.animations.play('shoot')
        }
    },
    
    bulletHitEnemy: function(bullet, enemy) {

        enemy.kill();
        bullet.kill();

    },
    
    enemyHitPlayer: function() {
//        this.player.animations.play('death')
            var life = this.lifes.getFirstAlive();
            life.kill();
            this.invunerable = true
            this.player.tint = 0xb80101;
            this.game.time.events.add(1000, this.gameOver, this)
        
    },
    
    
    groundCollision: function(enemy, groundCollisor){
        
        if(enemy.body.touching.right){
            enemy.body.velocity.x = -300
        }
        
        else if(enemy.body.touching.left){
            enemy.body.velocity.x = 300
        }
    },
    
    gameOver: function() {
        
        if(this.playerHealth == 0){
            this.invunerable = false
            this.isAlive = false
            this.game.state.start('gameover')
        }
        else{
            this.invunerable = false
            this.playerHealth -= 1
            this.player.tint = 0xFFFFFF;

        }
    }
}