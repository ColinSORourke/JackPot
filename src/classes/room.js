class Room {
    constructor(scene, key, x, y){
        // Initialize Tilemap
        this.map = scene.add.tilemap(key);
        let tileset = this.map.addTilesetImage('KenneySample', 'tiles')
        let layer = this.map.createLayer("Tile Layer 1", tileset, x, y);
        this.x = x
        this.y = y
    }
}