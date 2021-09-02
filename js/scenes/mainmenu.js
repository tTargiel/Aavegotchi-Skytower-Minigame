class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'MainMenu' });
    }

    async preload() {
        this.load.audio('click1', 'assets/audio/click1.ogg');

        this.load.image('back', 'assets/images/buttons/back.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('customize', 'assets/images/buttons/customize.png');
        this.load.image('leaderboard', 'assets/images/buttons/leaderboard.png');
        this.load.image('logout', 'assets/images/buttons/logout.png');
        this.load.image('menu', 'assets/images/buttons/menu.png');
        this.load.image('start', 'assets/images/buttons/start.png');
        this.load.image('title', 'assets/images/buttons/title.png');

        // Fetch player SVG
        const numericTraits = [12, 12, 12, 12, 12, 12]; // UI to change the traits
        const equippedWearables = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
        const rawSVG = await Moralis.Cloud.run("getSVG", {
            numericTraits: numericTraits,
            equippedWearables: equippedWearables
        });
        let newSVG = rawSVG.substr(0, rawSVG.length - 6) + "<style>.gotchi-bg,.wearable-bg{display: none;}</style></svg>";
        const svgBlob = new Blob([newSVG], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        console.log(url)
        this.load.svg('player', url, { width: w / 2, height: h });
        this.load.on('filecomplete', function () {
            let player = this.add.image(w * 0.3, h / 2, 'player');
        }, this);
        this.load.start();
    }

    create() {
        var click1 = this.sound.add('click1');

        var background = this.add.image(w / 2, h / 2, 'background');
        var title = this.add.image(w * 0.75, h * 0.25, 'title').setScale(scale);
        var menu = this.add.image(w * 0.75, h * 0.54, 'menu').setScale(scale);
        var start = this.add.image(w * 0.75, h * 0.37, 'start').setInteractive().setScale(scale);
        var customize = this.add.image(w * 0.75, h * 0.48, 'customize').setInteractive().setScale(scale);
        var leaderboard = this.add.image(w * 0.75, h * 0.575, 'leaderboard').setInteractive().setScale(scale);
        var logout = this.add.image(w * 0.75, h * 0.72, 'logout').setInteractive().setScale(scale);
        let player = this.add.image(w * 0.3, h / 2, 'player');

        this.input.manager.enabled = true;

        start.on('pointerdown', function (ev) {
            click1.play();
            this.scene.start('Game');

        }, this);
        customize.on('pointerdown', function (ev) {
            click1.play();
            this.scene.start('Customize');

        }, this);
        leaderboard.on('pointerdown', function (ev) {
            click1.play();
            this.scene.start('Leaderboard');

        }, this);
        logout.on('pointerdown', function (ev) {
            // click1.play();
            logOut();

        }, this);
    }
}