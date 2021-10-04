class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }
    
    init(data){
        this.pausedScene = data.srcScene;
    }

    create(){
        var spacing = 64;
        this.add.rectangle(0,0,1080,800, 0x000000).setAlpha(0.7).setOrigin(0,0)

        this.add.text(game.config.width/2, game.config.height/3, 'YOU LOSE', 32).setOrigin(0.5)

        // Add Reset text & button
        var resetButton = this.add.text(game.config.width/2, game.config.height/2, 'RESET', 32).setOrigin(0.5);
        resetButton.setInteractive();
        resetButton.on('pointerdown', () => {
            this.scene.stop(this.pausedScene);
            this.scene.start('playScene');
        });

    }
}