class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, room, type){
        super(scene, 0, 0, key, frame)
        scene.add.existing(this)
        this.setOrigin(0,0).setScale(.25);

        this.room = room
        this.room.moveSpriteTo(this, x, y) 
        this.tileX = x
        this.tileY = y

        this.type = type //class of enemy (Skeleton, Slime, etc)
    }

    update(player){
        //move one step towards player when called
        if(this.tileX < player.tileX){
            this.room.moveSpriteTo(this,this.tileX+1,this.tileY)
            this.tileX+=1
        }else if(this.tileX > player.tileX){
            this.room.moveSpriteTo(this,this.tileX-1,this.tileY)
            this.tileX-=1
        }else{
            if(this.tileY < player.tileY){
                this.room.moveSpriteTo(this,this.tileX,this.tileY+1)
                this.tileY+=1
            }else {
                this.room.moveSpriteTo(this,this.tileX,this.tileY-1)
                this.tileY-=1
            }
        }
        //if going to move to player
            //then dont
    }
}