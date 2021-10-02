class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        // Initialize Tilemap
        /* this.map = this.add.tilemap('roomA');
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, 0, 0); */

        this.slots = new slotGrid(this, 100, 100, 20)
        //this.roomA = new Room(this, 'roomA', 200 ,200)     

        // Create Player
        this.player = new Player(this, 3, 3, 'testPlayer', 0, this.slots.randomRoom())

        // List of Enemies
        this.enemies = []

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
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(){
        this.player.update();
        //handle enemy
        if (Phaser.Input.Keyboard.JustUp(keyUP) || Phaser.Input.Keyboard.JustUp(keyDOWN) 
            || Phaser.Input.Keyboard.JustUp(keyLEFT) || Phaser.Input.Keyboard.JustUp(keyRIGHT)){
            this.tick()    
        }
        if (Phaser.Input.Keyboard.JustUp(keySPACE)){ //spawn skeleton
            let newEnemy = new Enemy(this, 1, 1, 'testEnemy', 0, this.player.room, 'skeleton')
            this.enemies.push(newEnemy)
        }
    }

    //when player makes a move
    tick(){
        let tempPlayer = this.player;
        this.enemies.forEach((e) => {
            e.update(tempPlayer)
        });
    }

    pause() {
        this.scene.pause();
        this.scene.launch('pauseScene', { srcScene: "playScene" });
    }
}