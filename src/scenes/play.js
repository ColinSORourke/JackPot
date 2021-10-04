class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        // Initialize slot machine dungeon
        
        

        this.machine = this.add.sprite(0, 0, "BGMachine", '0001').setOrigin(0,0)
        let idleFrameNames = this.machine.anims.generateFrameNames('BGMachine', { prefix: '', start: 1, end: 60, zeroPad: 4 });
        this.machine.anims.create({
            key: 'machinePull',
            frames: idleFrameNames,
            frameRate: 60,
            yoyo: true,
            repeat: 0
        });


        this.slots = new slotGrid(this, 135, 350, 10)
        this.slots.identifyPrizes()

        // Create Player in the center of a random room
        this.player = new Player(this, 2, 2, 'testPlayer', 0, this.slots.randomRoom())

        // List of Enemies
        this.enemies = []

        // Create Pause Button
        this.pauseButton = this.add.text(game.config.width/2, game.config.height - 25, 'PAUSE', 20).setOrigin(0.5)
        // Give Pause Button purpose
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            this.pause();
        });

        //lever and UI stuff
        this.leverClickbox = this.add.rectangle(300, 300, 2000, 2000).setInteractive()
        let currentScene = this;
        this.leverClickbox.on('pointerdown', function(pointer) {
            //spin columns that player is not in
            currentScene.spinColumns(currentScene.player)
        });
        //this.lever = new Sprite(this, 300, 300, 'testPlayer')

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(){
        // Hook in the player's update function
        this.player.update();
        
        if (Phaser.Input.Keyboard.JustUp(keySPACE)){ //spawn skeleton TEMPORARY
            //let newEnemy = new Enemy(this, 1, 1, 'testEnemy', 0, this.player.room, 'skeleton')
            //this.enemies.push(newEnemy)
        }
    }

    //when player makes a move, update everything alongside them
    tick(){
        
        let tempPlayer = this.player;
        this.enemies.forEach((e) => {
            e.update(tempPlayer)
        });
        this.player.tick();
    }

    pause() {
        this.scene.pause();
        this.scene.launch('pauseScene', { srcScene: "playScene" });
    }

    spinColumns(){
        let player = this.player
        let index = 0
        while (index < this.enemies.length){
            let currEnemy = this.enemies[index]
            if (currEnemy.room.column != player.room.column){
                currEnemy.destroy()
                this.enemies.splice(index, 1)
            } else {
                index += 1
            }
        }
        this.machine.anims.play('machinePull')
        this.slots.deleteRooms(this.player)
        this.slots.replaceRooms(this.player)
        this.slots.identifyPrizes()
    }

}