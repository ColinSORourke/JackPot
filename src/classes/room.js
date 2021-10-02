class Room {
    constructor(scene, key, x, y){
        // Initialize Tilemap
        this.map = scene.add.tilemap(key);
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, x, y);
        this.x = x
        this.y = y
    }

    moveSpriteTo(sprite, x, y){
        let moveTo = this.map.getTileAt(x, y)
        if (moveTo && !moveTo.properties["collides"]){
            sprite.x = this.x + x * 16
            sprite.y = this.y + y * 16
            return true
        } else {
            return false
        }
    }
}