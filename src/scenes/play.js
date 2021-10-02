class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        this.map = this.add.tilemap('roomA');
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0);

        this.player = new Player(this, 37, 69, 'testPlayer', 0, this.map)

        this.pauseButton = this.add.text(game.config.width/2, game.config.height - 25, 'PAUSE', 20).setOrigin(0.5)
        // Give Menu Button purpose
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            this.pause();
        });
    }

    onBounce(body){
        let color = new Phaser.Display.Color()
        color.random(50)
        body.gameObject.setTint(color.color)
    }

    update(){
        
    }

    pause() {
        this.scene.pause();
        this.scene.launch('pauseScene', { srcScene: "playScene" });
    }
}