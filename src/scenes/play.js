class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        // Initialize Tilemap
        this.map = this.add.tilemap('roomA');
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0);

        // Create Player
        this.player = new Player(this, 37, 69, 'testPlayer', 0, this.map)

        // Create Pause Button
        this.pauseButton = this.add.text(game.config.width/2, game.config.height - 25, 'PAUSE', 20).setOrigin(0.5)
        // Give Pause Button purpose
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            this.pause();
        });

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    update(){
        this.player.update();
    }

    pause() {
        this.scene.pause();
        this.scene.launch('pauseScene', { srcScene: "playScene" });
    }
}