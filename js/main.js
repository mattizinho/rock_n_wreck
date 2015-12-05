// Criando o jogo efetivamente
// parâmetros: largura, altura, tipo de renderização, ID do div
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-canvas');
// Adicionando o estado criado e inicializando o mesmo automaticamente
game.state.add('intro', introState, true);
game.state.add('game', gameState, true);
game.state.add('gameover', gameOverState, true);
game.state.add('credits', creditsState, true);
game.state.add('controls', controlsState, true);

game.state.start('intro');