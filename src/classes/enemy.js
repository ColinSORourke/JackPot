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
        if(this.room.column < player.room.column || this.tileX < player.tileX){
            if(!(this.room.column+1 == player.room.column)){
                this.room.moveSpriteTo(this,this.tileX+1,this.tileY)
                this.tileX+=1
            }
        }
        else if(this.room.column > player.room.column || this.tileX > player.tileX){
            if(!(this.room.column-1 == player.room.column)){
                this.room.moveSpriteTo(this,this.tileX-1,this.tileY)
                this.tileX-=1
            }
        }
        else{
            if(this.room.row < player.room.row || this.tileY < player.tileY){
                if(!(this.room.row+1 == player.room.row)){
                    this.room.moveSpriteTo(this,this.tileX,this.tileY+1)
                    this.tileY+=1
                }
            }
            else(this.room.row < player.room.row || this.tileY > player.tileY){
                if(!(this.room.row-1 == player.room.row)){
                    this.room.moveSpriteTo(this,this.tileX,this.tileY-1)
                this.tileY-=1
                }
            }
        }
    }
    
}