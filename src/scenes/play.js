class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        // Initialize slot machine dungeon
        this.slots = new slotGrid(this, 100, 20, 10)

        // Create Player in the center of a random room
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
            let newEnemy = new Enemy(this, 1, 1, 'testEnemy', 0, this.player.room, 'skeleton')
            this.enemies.push(newEnemy)
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

    spinColumns(player){
        for(let i = 0; i < 3; i++){
            //only move rooms columns player is not in
            for(let j = 0; j < 3; j++){
                if(i != this.player.room.column){
                    let currentRoom = this.slots.slots[i][j]
                    currentRoom.destroy()
                    /*
                    let scroll = this.tweens.add({
                        targets: currentRoom,
                    ease: 'Linear',
                        duration: 2000,
                        onComplete: currentRoom.destroy(),
                        y: -20
                    })
                    */
                    this.slots.slots[i][j] = new Room(this, 'roomA', 100 + 7*32*j + 10*j, 20 + 7*32*i + 10*i, this, j, i)
            }
        }
            
        }
    }

}