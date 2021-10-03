class slotGrid {
    constructor(scene, x, y, margins){
        this.scene = scene
        this.slots = [[],[],[]]

        let j = 0
        let i = 0
        while (j < 3){
            i = 0
            while (i < 3){
                this.slots[j].push(new Room(scene, 'roomA', x + 7*32*j + margins*j, y + 7*32*i + margins*i, this, j, i))
                i += 1;
            }
            j += 1
        }
    }

    randomRoom(){
        let column = randInt(3)
        let row = randInt(3)
        return (this.slots[column][row])
    }
}