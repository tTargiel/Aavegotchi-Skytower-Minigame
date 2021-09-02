// Connect to Moralis server
Moralis.initialize("ZJunkHLQecMCmFhN7NKYAZ76SgutQrCh7xh6wEyB");
Moralis.serverURL = "https://ymcm6oxklb9t.bigmoralis.com:2053/server";

var Skytower = Skytower || {};

class MainMenu extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'MainMenu' });
    }

    preload ()
    {
        this.load.image('preloaderBar', 'assets/images/old/preloader-bar.png');
    }

    create ()
    {
        //this.face = this.add.image(400, 300, 'preloaderBar');
        var preloaderBar = this.add.image(400, 300, 'preloaderBar').setInteractive();
        this.input.manager.enabled = true;

        preloaderBar.on('pointerdown', function (ev) {

            this.scene.start('Customization');

        }, this);
    }
}

class Customization extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Customization' });
    }

    preload ()
    {
        this.load.image('enemy', 'assets/images/old/enemy.png');
    }

    create ()
    {
        //this.face = this.add.image(400, 300, 'enemy');
        var enemy = this.add.image(400, 300, 'enemy').setInteractive();

        this.input.manager.enabled = true;

        enemy.on('pointerdown', function () {

            this.scene.start('Leaderboard');

        }, this);
    }
}

class Leaderboard extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Leaderboard' });
    }

    preload ()
    {
        this.load.image('player', 'assets/images/old/player.png');
    }

    create ()
    {
        //this.face = this.add.image(400, 300, 'player');
        var player = this.add.image(400, 300, 'player').setInteractive();

        this.input.manager.enabled = true;

        player.on('pointerdown', function () {

            this.scene.start('Game');

        }, this);
    }
}

class Game extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Game' });
    }

    preload ()
    {
        this.load.image('rock', 'assets/images/old/rock.png');
    }

    create ()
    {
        //this.face = this.add.image(400, 300, 'rock');
        var rock = this.add.image(400, 300, 'rock').setInteractive();

        this.input.manager.enabled = true;

        rock.on('pointerdown', function () {

            this.scene.start('MainMenu');

        }, this);
    }
}

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500
            },
            debug: true
        }
    },
    scene: [ MainMenu, Customization, Leaderboard, Game ]
};

function launch() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("PLEASE LOG IN WITH METAMASK!");
    } else {
        console.log(user.get("ethAddress") + " logged in");

        document.getElementById("gradient").style.display = "none";
        document.getElementById("contents").style.display = "none";

        Skytower.game = new Phaser.Game(config);
    }
}
launch();
