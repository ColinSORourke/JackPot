class Preload extends Phaser.Scene
{
    constructor() {
        super("preloadScene");
    }

    preload ()
    {   
        this.load.image('Head', './assets/ColinHead.jpg');
        this.load.image('tiles', './assets/tiles.png')
        this.load.image('whiteRect', './assets/WhiteRect.png')
        this.load.tilemapTiledJSON('room0', './assets/rooms/JSONRooms/NeonTileRoom.json')
        this.load.tilemapTiledJSON('room1', './assets/rooms/JSONRooms/NeonRoom1.json')
        this.load.tilemapTiledJSON('room2', './assets/rooms/JSONRooms/NeonRoom2.json')
        this.load.tilemapTiledJSON('room3', './assets/rooms/JSONRooms/NeonRoom3.json')

        this.load.atlas('BGMachine', './assets/machine.png', './assets/machine.json')

        this.load.image('testPlayer', './assets/characters-01.png')
        this.load.image('testEnemy', './assets/characters-02.png')

        this.load.image('coinIcon', './assets/icons-01.png')
        this.load.image('enemyIcon', './assets/icons-02.png')

        this.load.image('instructions','./assets/Instructions-01.png')

        this.load.audio('spin','assets/Sound/spin.wav')

        this.createProgressbar(game.config.width / 2, game.config.height / 2);
    }

    createProgressbar (x, y)
    {
        // size & position
        let width = 400;
        let height = 20;
        let xStart = x - width / 2;
        let yStart = y - height / 2;

        // border size
        let borderOffset = 2;

        let borderRect = new Phaser.Geom.Rectangle(
            xStart - borderOffset,
            yStart - borderOffset,
            width + borderOffset * 2,
            height + borderOffset * 2);

        let border = this.add.graphics({
            lineStyle: {
                width: 5,
                color: 0xaaaaaa
            }
        });
        border.strokeRectShape(borderRect);

        let progressbar = this.add.graphics();

        /**
         * Updates the progress bar.
         * 
         * @param {number} percentage 
         */
        let updateProgressbar = function (percentage)
        {
            progressbar.clear();
            progressbar.fillStyle(0xffffff, 1);
            progressbar.fillRect(xStart, yStart, percentage * width, height);
        };

        this.load.on('progress', updateProgressbar);

        this.load.once('complete', function ()
        {

            this.load.off('progress', updateProgressbar);
            this.scene.start('playScene');

        }, this);
    }
}