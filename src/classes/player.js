class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, room){
        let myTile = room.getTileAtWorldXY(x,y)
        console.log("x: " + myTile.x + " y: " + myTile.y)
        super(scene, myTile.x * 16, myTile.y * 16, key, frame)
        scene.add.existing(this)
        this.setOrigin(0,0)

    }
}