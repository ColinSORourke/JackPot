class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, room){
        let myTile = room.getTileAtWorldXY(x,y)
        super(scene, myTile.x * 16, myTile.y * 16, key, frame)
        scene.add.existing(this)
        this.setOrigin(0,0)

        this.tileX = myTile.x
        this.tileY = myTile.y
        this.room = room
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            let moveTo = this.room.getTileAt(this.tileX, this.tileY - 1)
            if (moveTo){
                if (moveTo.properties["collides"]){
                    // Don't Move
                } else {
                    this.tileY -= 1
                    this.y = this.tileY * 16
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            let moveTo = this.room.getTileAt(this.tileX, this.tileY + 1)
            if (moveTo){
                if (moveTo.properties["collides"]){
                    // Don't Move
                } else {
                    this.tileY += 1
                    this.y = this.tileY * 16
                }
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            let moveTo = this.room.getTileAt(this.tileX - 1, this.tileY)
            if (moveTo){
                if (moveTo.properties["collides"]){
                    // Don't Move
                } else {
                    this.tileX -= 1
                    this.x = this.tileX * 16
                }
            }
            
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            let moveTo = this.room.getTileAt(this.tileX + 1, this.tileY)
            if (moveTo){
                if (moveTo.properties["collides"]){
                    // Don't Move
                } else {
                    this.tileX += 1
                    this.x = this.tileX * 16
                }
            }
            
        }
    }

}