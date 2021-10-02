class Room {
    constructor(scene, key, x, y, parent, column, row){
        // Initialize Tilemap
        this.map = scene.add.tilemap(key);
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, x, y);
        this.x = x
        this.y = y
        this.parent = parent
        this.column = column
        this.row = row
    }

    moveSpriteTo(sprite, x, y){
        console.log(x, y)
        let moveTo = this.map.getTileAt(x, y)
        if (moveTo && !moveTo.properties["collides"]){
            sprite.x = this.x + x * 16
            sprite.y = this.y + y * 16
            return true
        } else {
            if (x == -1){
                // Check if can go left one room
                if (this.column != 0){
                    sprite.room = this.parent.slots[this.column - 1][this.row]
                    sprite.tileX = 6
                    sprite.room.moveSpriteTo(sprite, sprite.tileX, sprite.tileY)
                }
            } else if (x == 7){
                // check if can go right one room
                if (this.column != 2){
                    sprite.room = this.parent.slots[this.column + 1][this.row]
                    sprite.tileX = 0
                    sprite.room.moveSpriteTo(sprite, sprite.tileX, sprite.tileY)
                }
            } else if (y == -1){
                // check if can go up one room
                if (this.row != 0){
                    sprite.room = this.parent.slots[this.column][this.row - 1]
                    sprite.tileY = 6
                    sprite.room.moveSpriteTo(sprite, sprite.tileX, sprite.tileY)
                }
            } else if (y == 7){
                // check if can go down one room
                if (this.row != 2){
                    sprite.room = this.parent.slots[this.column][this.row + 1]
                    sprite.tileY = 0
                    sprite.room.moveSpriteTo(sprite, sprite.tileX, sprite.tileY)
                }
            }
            return false
        }


    }

    destroy(){
        this.map.destroy()
    }
}