// Connect to Moralis server
Moralis.initialize("ZJunkHLQecMCmFhN7NKYAZ76SgutQrCh7xh6wEyB");
Moralis.serverURL = "https://ymcm6oxklb9t.bigmoralis.com:2053/server";

var Skytower = Skytower || {};

var w = window.innerWidth;
var h = window.innerHeight;

class MainMenu extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'MainMenu' });
    }

    preload ()
    {
        this.load.image('back', 'assets/images/buttons/back.png');
        this.load.image('customize', 'assets/images/buttons/customize.png');
        this.load.image('leaderboard', 'assets/images/buttons/leaderboard.png');
        this.load.image('logout', 'assets/images/buttons/logout.png');
        this.load.image('menu', 'assets/images/buttons/menu.png');
        this.load.image('start', 'assets/images/buttons/start.png');
        this.load.image('title', 'assets/images/buttons/title.png');
    }

    create ()
    {
        var title = this.add.image(w * 0.75, h * 0.21, 'title');
        var menu = this.add.image(w * 0.75, h * 0.5, 'menu');
        var start = this.add.image(w * 0.75, h * 0.33, 'start').setInteractive();
        var customize = this.add.image(w * 0.75, h * 0.44, 'customize').setInteractive();
        var leaderboard = this.add.image(w * 0.75, h * 0.535, 'leaderboard').setInteractive();
        var logout = this.add.image(w * 0.75, h * 0.68, 'logout').setInteractive();
        
        this.input.manager.enabled = true;

        start.on('pointerdown', function (ev) {

            this.scene.start('Game');

        }, this);
        customize.on('pointerdown', function (ev) {

            this.scene.start('Customize');

        }, this);
        leaderboard.on('pointerdown', function (ev) {

            this.scene.start('Leaderboard');

        }, this);
        logout.on('pointerdown', function (ev) {

            logOut();

        }, this);
    }
}

class Customize extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Customize' });
    }

    preload ()
    {
        this.load.image('back', 'assets/images/buttons/back.png');  
    }

    create ()
    {
        var back = this.add.image(50, 50, 'back').setInteractive();
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {

            this.scene.start('MainMenu');

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
        this.load.image('back', 'assets/images/buttons/back.png');  
    }

    create ()
    {
        var back = this.add.image(50, 50, 'back').setInteractive();
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {

            this.scene.start('MainMenu');

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
        this.load.image('back', 'assets/images/buttons/back.png');  
    }

    create ()
    {
        var back = this.add.image(50, 50, 'back').setInteractive();
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {

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
    scene: [ MainMenu, Customize, Leaderboard, Game ]
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
