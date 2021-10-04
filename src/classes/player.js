class Player extends Phaser.GameObjects.Sprite {
    // Different from the regular Sprite constructor, the x & y here are the local tile coordinates within a room, which is also a parameter passed into this constructor
    constructor(scene, x, y, key, frame, room){
        // Add sprite stuff
        super(scene, 0, 0, key, frame)
        scene.add.existing(this)
        this.setOrigin(0,0)

        // Store so we can reference
        this.scene = scene

        this.health = 10
        this.healthText = scene.add.text(0,0, this.health)

        // The player stores the current room they are in, and their local coordinates within that room
        this.room = room
        this.tileX = x
        this.tileY = y
        this.room.moveSpriteTo(this, x, y)
    }

    // This update is NOT inherently called by phaser, and has to called inside a scenes update loop to work properly
    update(){
        // The player wants to move up, so we call the room the player is inside and ask the room to handle that with room.moveSpriteTo
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            // moveSpriteTo will return false if a move is into a wall or to another room
            if (this.room.moveSpriteTo(this, this.tileX, this.tileY - 1)){
                // so when it is false, we don't update our tile coordinate or cause the scene to tick
                this.tileY -= 1
                this.scene.tick()
            }
        }
        // Same process for all other directions
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            if (this.room.moveSpriteTo(this, this.tileX, this.tileY + 1)){
                this.tileY += 1
                this.scene.tick()
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            if (this.room.moveSpriteTo(this, this.tileX - 1, this.tileY)){
                this.tileX -= 1
                this.scene.tick()
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            if (this.room.moveSpriteTo(this, this.tileX + 1, this.tileY)){
                this.tileX += 1
                this.scene.tick()
            }
        }
    }

    tick(){
        this.healthText.text = this.health
    }   

    getColumn(){
        return this.room.getColumn()
    }
}