class slotGrid {
    constructor(scene, x, y, margins){
        this.scene = scene
        this.slots = [[],[],[]]

        this.startX = x
        this.startY = y
        this.margins = margins

        let j = 0
        let i = 0
        while (j < 3){
            i = 0
            while (i < 2){
                let roomKey = "room" + randInt(4)
                this.slots[j].push(new Room(scene, roomKey, x + 5*32*j + margins*j, y + 5*32*i + margins*i, this, j, i))
                i += 1;
            }
            j += 1
        }
    }

    randomRoom(){
        let column = randInt(3)
        let row = randInt(2)
        return (this.slots[column][row])
    }

    deleteRooms(player){
        let column = 0;
        while (column < 3){
            if (column != player.room.column){
                let row = 0
                while (row < 2){
                    let currentRoom = this.slots[column][row]
                    currentRoom.destroy()
                    
                    row += 1
                }
                this.slots[column] = []
            }

            column += 1
        }
    }

    replaceRooms(player){
        let column = 0;
        while (column < 3){
            if (column != player.room.column){
                let row = 0
                while (row < 2){
                    let roomKey = "room" + randInt(4)
                    this.slots[column].push(new Room(this.scene, roomKey, this.startX + 5*32*column + this.margins*column, this.startY + 5*32*row + this.margins*row, this, column, row))
                    
                    row += 1
                }
            }

            column += 1
        }
    }

    identifyPrizes(){
        let row = 0
        while (row < 2){
            let column = 0
            let icon = this.slots[column][row].icon
            let match = true
            while (column < 3 && match){
                if (this.slots[column][row].icon != icon){
                    match = false
                }
                column += 1
            }
            if (match){
                if (icon == 1){
                    this.scene.spawnEnemy();
                }
                else if (icon == 0){
                    this.scene.spawnMoney();
                }
                console.log("WOW WINNER")
            }
            row += 1
        }
    }
}