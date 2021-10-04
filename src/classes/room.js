class Room {
    constructor(scene, key, x, y, parent, column, row){

        // Initialize Tilemap stuffs
        this.map = scene.add.tilemap(key);
        let tileset = this.map.addTilesetImage('NeonTiles', 'tiles', 32, 32, 1, 1)
        this.layer = this.map.createLayer("Tile Layer 1", tileset, x, y);

        // Store some important info
        this.x = x
        this.y = y
        this.parent = parent
        this.column = column
        this.row = row

        this.possIcons = ['coinIcon','enemyIcon']
        this.icon = scene.add.sprite(x+16,y+16,this.possIcons[Phaser.Math.Between(0,1)])
    }

    // Whenever a sprite wants to move, it calls this function. 
    // This function will move a sprite to the top left corner of the x y tile of the room object.
    moveSpriteTo(sprite, x, y){
        // Make sure
        // A) the tile a sprite wants to move to exists
        // B) the tile a sprite wants to move to is not 'solid' (the collides property)
        let moveTo = this.map.getTileAt(x, y)
        if (moveTo && !moveTo.properties["collides"]){
            // Update sprites position and report a successful move
            sprite.x = this.x + x * 32 + 16
            sprite.y = this.y + y * 32 + 16
            return true
        } else {
            // If we are in here, either the tile the sprite tried to go to is out of bounds, or is impassable
            // if it's out of bounds, we want to check if the sprite can move to the adjacent room in that direction
            if (x == -1){
                // Check if can go left one room
                if (this.column != 0){
                    let newRoom = this.parent.slots[this.column - 1][this.row]
                    if (newRoom.moveSpriteTo(sprite, 4, sprite.tileY)) {
                        // Normally moveSpriteTo doesn't update any of the sprite's properties, but in the case of moving to a new room it needs to step in.
                        sprite.room = newRoom
                        sprite.tileX = 4
                    }
                }
            } else if (x == 5){
                // check if can go right one room
                if (this.column != 2){
                    let newRoom = this.parent.slots[this.column + 1][this.row]
                    if (newRoom.moveSpriteTo(sprite, 0, sprite.tileY)) {
                        sprite.room = newRoom
                        sprite.tileX = 0
                    }
                }
            } else if (y == -1){
                // check if can go up one room
                if (this.row != 0){
                    let newRoom = this.parent.slots[this.column][this.row - 1]
                    if (newRoom.moveSpriteTo(sprite, sprite.tileX, 4)) {
                        sprite.room = newRoom
                        sprite.tileY = 4
                    }
                }
            } else if (y == 5){
                // check if can go down one room
                if (this.row != 1){
                    let newRoom = this.parent.slots[this.column][this.row + 1]
                    if (newRoom.moveSpriteTo(sprite, sprite.tileX, 0)) {
                        sprite.room = newRoom
                        sprite.tileY = 0
                    }
                }
            }
            return false
        }


    }

    destroy(){
        this.map.destroy()
    }
}