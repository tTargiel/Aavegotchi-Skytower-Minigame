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
        eval(cont + platform + ".setActive(false);");
        eval(cont + platform + ".setVisible(false);");
        platformsXcoordinates[platform] = randomIntFromInterval(left, right);
        platformsYcoordinates[platform] = tilesize / (2 * scale);
        // for (let k = 0; k < randomIntFromInterval(tilemin, tilemax); k++) {
        //     platforms = this.physics.add.image(platformsXcoordinates[amountOfPlatforms] + tilesize * k, platformsYcoordinates[amountOfPlatforms], 'tile').setScale(tilescale * scale).refreshBody();
        //     platforms.body.velocity.y = vel;
        //     this.physics.add.collider(player, platforms);
        // }
        // platforms.setCollideWorldBounds(true);
        // platforms.body.onWorldBounds = true;
        // platforms.body.world.on('worldbounds', function (body) {
        //     if (body.gameObject === this) {
        //         this.setActive(false);
        //         this.setVisible(false);
        //         this.scene.addPlatform();
        //     }
        // }, platforms);


        eval(cont + platform + " = this.add.container("+platformsXcoordinates[platform]+", "+platformsYcoordinates[platform]+");");
        for (let k = 0; k < randomIntFromInterval(tilemin, tilemax); k++) {
            eval("tile" + k + " = this.add.image(" + platformsXcoordinates[platform] + " + " + tilesize * k + ", " + platformsYcoordinates[platform] + ", 'tile');");
            eval(cont + platform + ".add(tile" + k + ");");
        }
        eval(cont + platform + ".setSize(" + tilemax * 48 + ", 48);");
        this.physics.world.enableBody(eval(cont + platform));
        this.physics.world.collide(player, eval(cont + platform));
        if (platform == amountOfPlatforms - 1) {
            platform = 0;
        }
        // eval(cont+i+".setCollideWorldBounds(true);");
        // eval(cont+i+".body.onWorldBounds = true;");
        // eval(cont+i+".body.world.on('worldbounds', function (body) {if (body.gameObject === this) {this.setActive(false);this.setVisible(false);this.scene.addPlatform();}}, "+cont+i+");");
        // this.physics.add.overlap(player, eval(cont+i));
        // eval("collider"+i+" = this.physics.world.collide(player, "+cont+i+")");
        // }
    }

    preload() {
        this.load.image('game-background', 'assets/images/game-background.png');
        this.load.image('ground', 'assets/images/tiles/tile1.png');
        this.load.image('tile', 'assets/images/tiles/tile2.png');
        this.load.image('wall', 'assets/images/tiles/tile3.png');
    }

    create() {
        var click2 = this.sound.add('click2');
        var background = this.add.image(w / 2, h / 2, 'game-background');
        this.input.manager.enabled = true;

        vel = 50;
        tilemin = 5;
        tilemax = 9;

        player = this.physics.add.image(w * 0.3, h / 2, 'player').setScale(0.1).setDepth(2).refreshBody();

        player.setBounce(0.2);
        // player.setCollideWorldBounds(true);
        player.body.setGravityY(400);

        platforms = this.physics.add.staticGroup();

        this.generateStartingPlatformPositions();
        // this.physics.world.gravity.y = -10;

        for (let i = 0; i < amountOfPlatforms; i++) {
            eval(cont + i + " = this.add.container("+platformsXcoordinates[i]+", "+platformsYcoordinates[i]+");");
            for (let j = 0; j < randomIntFromInterval(tilemin, tilemax); j++) {
                eval("tile" + j + " = this.add.image(" + platformsXcoordinates[i] + " + " + tilesize * j + ", " + platformsYcoordinates[i] + ", 'tile');");
                eval(cont + i + ".add(tile" + j + ");");
            }
            eval(cont + i + ".setSize(" + tilemax * 48 + ", 48);");
            this.physics.world.enableBody(eval(cont + i));
            this.physics.world.collide(player, eval(cont + i));
            // eval(cont+i+".setCollideWorldBounds(true);");
            // eval(cont+i+".body.onWorldBounds = true;");
            // eval(cont+i+".body.world.on('worldbounds', function (body) {if (body.gameObject === this) {this.setActive(false);this.setVisible(false);this.scene.addPlatform();}}, "+cont+i+");");
            // this.physics.add.overlap(player, eval(cont+i));
            // eval("collider"+i+" = this.physics.world.collide(player, "+cont+i+")");
        }

        // for (let i = 0; i < amountOfPlatforms; i++) {
        //     // var test = this.add.image(platformsXcoordinates[i], platformsYcoordinates[i], 'tile');

        // }

        // test = this.add.container();
        //     // for (let j = 0; j < randomIntFromInterval(tilemin, tilemax); j++) {
        //         // for (let j = 0; j < 6; j++) {
        //             test1 = this.add.image(platformsXcoordinates[0] + tilesize * 0, platformsYcoordinates[0], 'tile')
        //             test2 = this.add.image(platformsXcoordinates[0] + tilesize * 1, platformsYcoordinates[0], 'tile')
        //             test3 = this.add.image(platformsXcoordinates[0] + tilesize * 2, platformsYcoordinates[0], 'tile')
        //         // platforms.create(platformsXcoordinates[i] + tilesize * j, platformsYcoordinates[i], 'tile').setScale(tilescale).refreshBody();

        //     // }
        //     test.add(test1);
        //     test.add(test2);
        //     test.add(test3);

        // for (let i = 0; i < amountOfPlatforms; i++) {
        //     for (let j = 0; j < randomIntFromInterval(tilemin, tilemax); j++) {
        //         platforms = this.physics.add.image(platformsXcoordinates[i] + tilesize * j, platformsYcoordinates[i], 'tile').setScale(tilescale * scale).refreshBody();
        //         platforms.body.velocity.y = vel;
        //         this.physics.add.collider(player, platforms);
        //     }
        //     platforms.setCollideWorldBounds(true);
        //     platforms.body.onWorldBounds = true;
        //     platforms.body.world.on('worldbounds', function (body) {
        //         if (body.gameObject === this) {
        //             this.setActive(false);
        //             this.setVisible(false);
        //             this.scene.addPlatform();
        //         }
        //     }, platforms);
        // }

        this.walls = this.physics.add.staticGroup();

        var wallwidth = w * 0.2;
        for (let wallW = 0; wallW <= wallwidth / tilesize; wallW++) {
            for (let wallH = 0; wallH <= h / tilesize; wallH++) {
                this.walls.create(tilesize * wallW + tilesize / 2, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
                this.walls.create(tilesize * wallW - tilesize / 2 + w * 0.8, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
                this.physics.add.collider(player, this.walls);
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

        // this.physics.add.overlap(player, platforms);
        // collider = this.physics.add.collider(player, platforms);
        // for (let i = 0; i < amountOfPlatforms; i++) {
        //     this.physics.add.overlap(player, eval(cont+i));
        //     eval("collider"+i) = this.physics.add.collider(player, eval(cont+i));
        // }
    }

    update() {
        for (let a = 0; a < amountOfPlatforms; a++) {
            // eval(coll+a+".active = true;");
            this.physics.world.overlap(player, eval(cont + a));
        }
        
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
            player.setGravityY(400)
        }

        player.body.debugBodyColor = player.body.touching.none ? 0x0099ff : 0xff9900;

        
        if (player.body.touching.down) {
            for (let a = 0; a < amountOfPlatforms; a++) {
                // eval(coll+a+".active = true;");
                this.physics.world.collide(player, eval(cont + a));
            }
            // console.log("na platformie");
        }
        else {
            for (let b = 0; b < amountOfPlatforms; b++) {
                // eval(coll+b+".active = false;");
            }
            // console.log("w powietrzu");
        }

        for (let n = 0; n < amountOfPlatforms; n++) {
            eval(cont + n + ".body.velocity.y = "+vel+";");
            if (eval(cont + (amountOfPlatforms - 1)).y % (3 * tilesize) < 1) {
                this.addPlatform();
            }
        }

        // container0.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
        // container0.y += 1;

    }
}