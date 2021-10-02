class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, room){
        super(scene, 0, 0, key, frame)
        scene.add.existing(this)
        this.setOrigin(0,0)

        this.scene = scene
        this.room = room
        this.room.moveSpriteTo(this, x, y)
        this.tileX = x
        this.tileY = y
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            if (this.room.moveSpriteTo(this, this.tileX, this.tileY - 1)){
                this.tileY -= 1
                this.scene.tick()
            }
        }
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

}