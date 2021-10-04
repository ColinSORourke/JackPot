class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, room, type){
        super(scene, 0, 0, key, frame)
        scene.add.existing(this)
        this.setOrigin(0.5,0.5)

        this.room = room
        this.setDepth(2)
        this.room.moveSpriteTo(this, x, y) 
        this.tileX = x
        this.tileY = y

        this.type = type //class of enemy (Skeleton, Slime, etc)
    }

    update(player){
        //move one step towards player when called
        if (player.room == this.room){
            if (Math.abs(this.tileX - player.tileX) + Math.abs(this.tileY - player.tileY) <= 1){
                player.health -= 5
            }
            else if(this.tileX < player.tileX){
                if (this.room.moveSpriteTo(this,this.tileX+1,this.tileY)){
                    this.tileX+=1
                    this.angle = 90
                }
            }else if(this.tileX > player.tileX){
                if (this.room.moveSpriteTo(this,this.tileX-1,this.tileY)){
                    this.tileX-=1
                    this.angle = 270
                }
            }
            else if(this.tileY < player.tileY){
                if (this.room.moveSpriteTo(this,this.tileX,this.tileY+1)){
                    this.tileY+=1
                    this.angle = 180
                }
            }else if(this.tileY > player.tileY) {
                if (this.room.moveSpriteTo(this,this.tileX,this.tileY-1)){
                    this.tileY-=1
                    this.angle = 0
                }
            }
        }
        else{
            if(this.room.row < player.room.row){
                if (this.room.moveSpriteTo(this,this.tileX,this.tileY+1)){
                    this.tileY+=1
                }
            }
            else if(this.room.row > player.room.row){
                if (this.room.moveSpriteTo(this,this.tileX,this.tileY-1)){
                    this.tileY-=1
                }
            }
            else if(this.room.column > player.room.column){
                if (this.room.moveSpriteTo(this,this.tileX-1,this.tileY)){
                    this.tileX-=1
                }
            }
            else if(this.room.column < player.room.column){
                if (this.room.moveSpriteTo(this,this.tileX+1,this.tileY)){
                    this.tileX+=1
                }
            }
        }
    }

}