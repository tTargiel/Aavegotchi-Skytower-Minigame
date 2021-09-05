class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game' });
    }

    generateStartingPlatformPositions() {
        let height = h;
        for (let i = 0; i < 40; i++) {
            height -= h / (amountOfPlatforms - 1);
            platformsXcoordinates[i] = randomIntFromInterval(left, right);
            platformsYcoordinates[i] = height;
        }
    }

    addPlatform() {
        platformsXcoordinates[platform] = randomIntFromInterval(left, right);
        platformsYcoordinates[platform] = tilesize / 2;
        // eval(cont + platform + ".children.iterate(function (child) {child.destroy();});");
        // eval(cont + platform + ".clear(true);");
        temp = randomIntFromInterval(tilemin, tilemax);
            xd = Math.floor(temp / 2);
            for (let j = -1 * xd, sth = 0; j < xd, sth < temp; j++, sth++) {
                blockwidth = (tilesize * j);
                eval("tile" + sth + " = this.add.image(" + blockwidth + ", " + 0 + ", 'tile');");
                console.log(sth + " block added at position: x=" + blockwidth + ", y=" + platformsYcoordinates[platform]);

            }
            eval(cont + platform + " = this.add.container(" + platformsXcoordinates[platform] + ", " + platformsYcoordinates[platform] + ");");
            console.log("Added container: " + cont + platform + " at position: x=" + platformsXcoordinates[platform] + ", y=" + platformsYcoordinates[platform]);
            for (let hw = 0; hw < temp; hw++) {
                eval(cont + platform + ".add(tile" + hw + ");");
                console.log("tile" + hw + " added to " + cont + platform);
            }
            eval(cont + platform + ".setSize(" + temp * 48 + ", 48);");
            console.log(cont + platform + " size has been set to: x=" + temp * 48 + ", y=48");
            this.physics.world.enableBody(eval(cont + platform));
            this.physics.world.collide(player, eval(cont + platform));
            
            platform++;
            if (platform == 40) {
                platform = 0;
            }
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
        platform = amountOfPlatforms;

        vel = 50;
        tilemin = 5;
        tilemax = 9;

        player = this.physics.add.image(w * 0.3, h / 2, 'player').setScale(0.1).setDepth(2).refreshBody();

        player.setBounce(0.6);
        // player.setCollideWorldBounds(true);
        player.body.setGravityY(400);

        // platforms = this.physics.add.staticGroup();

        this.generateStartingPlatformPositions();
        // this.physics.world.gravity.y = -10;

        for (let i = 0; i < 40; i++) {
            temp = randomIntFromInterval(tilemin, tilemax);
            xd = Math.floor(temp / 2);
            for (let j = -1 * xd, sth = 0; j < xd, sth < temp; j++, sth++) {
                blockwidth = (tilesize * j);
                eval("tile" + sth + " = this.add.image(" + blockwidth + ", " + 0 + ", 'tile');");
                console.log(sth + " block added at position: x=" + blockwidth + ", y=" + platformsYcoordinates[i]);

            }
            eval(cont + i + " = this.add.container(" + platformsXcoordinates[i] + ", " + platformsYcoordinates[i] + ");");
            console.log("Added container: " + cont + i + " at position: x=" + platformsXcoordinates[i] + ", y=" + platformsYcoordinates[i]);
            for (let hw = 0; hw < temp; hw++) {
                eval(cont + i + ".add(tile" + hw + ");");
                console.log("tile" + hw + " added to " + cont + i);
            }
            eval(cont + i + ".setSize(" + temp * 48 + ", 48);");
            console.log(cont + i + " size has been set to: x=" + temp * 48 + ", y=48");
            this.physics.world.enableBody(eval(cont + i));
            this.physics.world.collide(player, eval(cont + i));
        }

        walls = this.physics.add.staticGroup();

        var wallwidth = w * 0.2;
        for (let wallW = 0; wallW <= wallwidth / tilesize; wallW++) {
            for (let wallH = 0; wallH <= h / tilesize; wallH++) {
                walls.create(tilesize * wallW + tilesize / 2, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
                walls.create(tilesize * wallW - tilesize / 2 + w * 0.8, tilesize * wallH + tilesize / 2, 'wall').setDepth(1).setScale(scale);
                this.physics.add.collider(player, walls);
            }
        }

        ground = this.physics.add.staticGroup();

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
    }

    update() {
        for (let a = 0; a < amountOfPlatforms; a++) {
            // check whether player moved through any of platforms
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


        if (player.body.touching.down && player.y < 0.8 * h) {
            for (let a = 0; a < amountOfPlatforms; a++) {
                // add collision between player and the platforms only when player is on the platform
                this.physics.world.collide(player, eval(cont + a));
            }
        }
        else {
            for (let b = 0; b < amountOfPlatforms; b++) {
                // eval(coll+b+".active = false;");
            }
        }

        for (let n = 0; n < 40; n++) {
            // add velocity to every platform
            eval(cont + n + ".body.velocity.y = " + vel + ";");
            if (eval(cont + (amountOfPlatforms - 1)).y % (3 * tilesize) < 1) {
                // this.addPlatform();
            }
        }

        // container0.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);
        // container0.y += 1;

    }
}