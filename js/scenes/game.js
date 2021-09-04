class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game' });
    }

    generateStartingPlatformPositions() {
        let height = h + (tilesize / (2 * scale));
        for (let i = 0; i < amountOfPlatforms; i++) {
            height -= h / amountOfPlatforms;
            platformsXcoordinates[i] = positions[randomIntFromInterval(0, amountOfPlatforms - 1)];
            platformsYcoordinates[i] = height;
        }
    }

    addPlatform() {
        platformsXcoordinates[amountOfPlatforms] = randomIntFromInterval(left, right);
        platformsYcoordinates[amountOfPlatforms] = tilesize / (2 * scale);
        for (let k = 0; k < randomIntFromInterval(tilemin, tilemax); k++) {
            platforms = this.physics.add.image(platformsXcoordinates[amountOfPlatforms] + tilesize * k, platformsYcoordinates[amountOfPlatforms], 'tile').setScale(tilescale * scale).refreshBody();
            platforms.body.velocity.y = vel;
            this.physics.add.collider(player, platforms);
        }
        platforms.setCollideWorldBounds(true);
        platforms.body.onWorldBounds = true;
        platforms.body.world.on('worldbounds', function (body) {
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
                this.scene.addPlatform();
            }
        }, platforms);
    }

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ground', 'assets/images/tiles/tile1.png');
        this.load.image('tile', 'assets/images/tiles/tile2.png');
        this.load.image('wall', 'assets/images/tiles/tile3.png');
    }

    create() {
        var click2 = this.sound.add('click2');
        var background = this.add.image(w / 2, h / 2, 'background');
        this.input.manager.enabled = true;

        vel = 50;
        tilemin = 5;
        tilemax = 10;

        player = this.physics.add.image(w * 0.3, h / 2, 'player').setScale(0.1).setDepth(2).refreshBody();

        player.setBounce(0.2);
        // player.setCollideWorldBounds(true);
        player.body.setGravityY(400);

        platforms = this.physics.add.staticGroup();

        this.generateStartingPlatformPositions();
        // this.physics.world.gravity.y = -10;

        // for (let i = 0; i < amountOfPlatforms; i++) {
        //     for (let j = 0; j < randomIntFromInterval(tilemin, tilemax); j++) {
        //         platforms.create(platformsXcoordinates[i] + tilesize * j, platformsYcoordinates[i], 'tile').setScale(tilescale).refreshBody();
        //     }
        // }

        for (let i = 0; i < amountOfPlatforms; i++) {
            for (let j = 0; j < randomIntFromInterval(tilemin, tilemax); j++) {
                platforms = this.physics.add.image(platformsXcoordinates[i] + tilesize * j, platformsYcoordinates[i], 'tile').setScale(tilescale * scale).refreshBody();
                platforms.body.velocity.y = vel;
                this.physics.add.collider(player, platforms);
            }
            platforms.setCollideWorldBounds(true);
            platforms.body.onWorldBounds = true;
            platforms.body.world.on('worldbounds', function (body) {
                if (body.gameObject === this) {
                    this.setActive(false);
                    this.setVisible(false);
                    this.scene.addPlatform();
                }
            }, platforms);
        }

        this.walls = this.add.group();

        var wallwidth = w * 0.2;
        for (let wallW = 0; wallW <= wallwidth / tilesize; wallW++) {
            for (let wallH = 0; wallH <= h / tilesize; wallH++) {
                this.walls.create(tilesize * wallW + tilesize / 2, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
                this.walls.create(tilesize * wallW - tilesize / 2 + w * 0.8, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
            }
        }

        ground = this.physics.add.staticGroup();
        var groundpiece;

        var groundwidth = w * 0.6;
        for (let groundW = 0; groundW < (groundwidth - 96) / tilesize; groundW++) {
            for (let groundH = 0; groundH < 2; groundH++) {
                ground.create(tilesize * groundW + 72 + w * 0.2, tilesize * groundH - 72 + h, 'ground').setDepth(1).setScale(scale);
                this.physics.add.collider(player, ground);
            }
        }

        var back = this.add.image(50, 50, 'back').setInteractive().setScale(0.7 * scale).setDepth(2);
        back.on('pointerdown', function (ev) {
            click2.play();
            this.scene.start('MainMenu');
            this.ground.setVisible(false);

        }, this);

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(player, platforms);
        collider = this.physics.add.collider(player, platforms);
    }

    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }
        else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-600);
        }

        player.body.debugBodyColor = player.body.touching.none ? 0x0099ff : 0xff9900;

        if (player.body.touching.down) {
            collider.active = true;
            // console.log("na platformie");
        }
        else {
            collider.active = false;
            // console.log("w powietrzu");
        }

        // platforms.y -= 10;
    }
}