class Play extends Phaser.Scene {
    constructor(){
        super("playScene")    
    }

    create(){
        console.log("We did it!")

        // Initialize slot machine dungeon
        
        

        this.machine = this.add.sprite(0, 0, "BGMachine", '0001').setOrigin(0,0).setDepth(-2)
        let idleFrameNames = this.machine.anims.generateFrameNames('BGMachine', { prefix: '', start: 1, end: 60, zeroPad: 4 });
        let mySpin = this.machine.anims.create({
            key: 'machinePull',
            frames: idleFrameNames,
            frameRate: 60,
            yoyo: true,
            repeat: 0
        });
        this.machine.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.canSpin = true
        }, this);

        this.slots = new slotGrid(this, 135, 350, 10)
        

        // Create Player in the center of a random room
        this.player = new Player(this, 2, 2, 'testPlayer', 0, this.slots.randomRoom())
        

        // List of Enemies
        this.enemies = []

        // Create Pause Button
        this.pauseButton = this.add.text(game.config.width/2, game.config.height - 25, 'PAUSE', 20).setOrigin(0.5)
        // Give Pause Button purpose
        this.pauseButton.setInteractive();
        this.pauseButton.on('pointerdown', () => {
            this.pause();
        });

        //lever and UI stuff
        this.leverClickbox = this.add.rectangle(750, 100, 300, 600).setInteractive().setOrigin(0,0)
        this.canSpin = true
        let currentScene = this;
        this.leverClickbox.on('pointerdown', function(pointer) {
            //spin columns that player is not in
            if (this.canSpin && this.player.health >= 1){
                currentScene.spinColumns(currentScene.player)
                this.canSpin = false
                this.player.health -= 1
                this.player.tick()
            }
        }, this);
        //this.lever = new Sprite(this, 300, 300, 'testPlayer')

        image = this.add.sprite(60, 345, 'whiteRect').setOrigin(0,0).setDepth(-1).setAlpha(0.7)
        fromColors = getRandomVertexColors();
        image.setTint(
            fromColors.topLeft.color,
            fromColors.topRight.color,
            fromColors.bottomLeft.color,
            fromColors.bottomRight.color
        );
        tintTween = tintTween.bind(this);
        initTweens();


        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.instructions = this.add.sprite(0,0,'instructions').setOrigin(0)
        this.slots.identifyPrizes()
    }

    update(){
        // Hook in the player's update function
        this.player.update();
    }

    //when player makes a move, update everything alongside them
    tick(){
        
        let tempPlayer = this.player;
        this.enemies.forEach((e) => {
            e.update(tempPlayer)
        });
        this.player.tick();
    }

    pause() {
        this.scene.pause();
        this.scene.launch('pauseScene', { srcScene: "playScene" });
    }

    spinColumns(){
        let player = this.player
        let index = 0
        while (index < this.enemies.length){
            let currEnemy = this.enemies[index]
            if (currEnemy.room.column != player.room.column){
                currEnemy.destroy()
                this.enemies.splice(index, 1)
            } else {
                index += 1
            }
        }
        this.machine.anims.play('machinePull')
        this.slots.deleteRooms(this.player)
        this.slots.replaceRooms(this.player)
        this.slots.identifyPrizes()
    }

    spawnEnemy(){
        let newEnemy = new Enemy(this, 2, 2, 'testEnemy', 0, this.player.room, 'skeleton')
        this.enemies.push(newEnemy)
    }

    spawnMoney(){
        this.player.health += 3
    }
}




// COPYING FROM https://phaser.io/examples/v3/view/tweens/tint-tween

var tween;
var image;
var fromColors;
var toColors;

function getRandomVertexColors ()
{
    // Create a random color for each vertex.
    // RandomRGB returns a Phaser.Display.Color object with random RGB values.
    var RandomRGB = Phaser.Display.Color.RandomRGB;
    return {
        topLeft: RandomRGB(),
        topRight: RandomRGB(),
        bottomLeft: RandomRGB(),
        bottomRight: RandomRGB()
    };
}

function getTintColor (vertex)
{

    // Interpolate between the fromColor and toColor of the current vertex,
    // using the current tween value.
    var tint = Phaser.Display.Color.Interpolate.ColorWithColor(
        fromColors[vertex],
        toColors[vertex],
        100,
        tween.getValue()
    );

    // Interpolate.ColorWithColor returns a Javascript object with
    // interpolated RGB values. We convert it to a Phaser.Display.Color object
    // in order to get the integer value of the tint color.
    return Phaser.Display.Color.ObjectToColor(tint).color;
}

function tintTween (fromColors, toColors, callback)
{
    tween = this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 2000,
        onUpdate: function ()
        {
            image.setTint(
                getTintColor('topLeft'),
                getTintColor('topRight'),
                getTintColor('bottomLeft'),
                getTintColor('topRight')
            );
        },
        onComplete: callback
    });
}

function initTweens ()
{
    fromColors = toColors || fromColors;
    toColors = getRandomVertexColors();
    tintTween(
        fromColors,
        toColors,
        initTweens
    );
}