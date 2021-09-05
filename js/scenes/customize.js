class Customize extends Phaser.Scene {

    constructor() {
        super({ key: 'Customize' });
        // var customizescreen;
    }

    async fetchSVG(numericTraits, equippedWearables) {
        // Fetch player SVG
        let rawSVG = await Moralis.Cloud.run("getSVG", {
            numericTraits: numericTraits,
            equippedWearables: equippedWearables
        });
        let newSVG = rawSVG.substr(0, rawSVG.length - 6) + "<style>.gotchi-bg,.wearable-bg{display: none;}</style></svg>";
        let svgBlob = new Blob([newSVG], { type: "image/svg+xml;charset=utf-8" });
        let url = URL.createObjectURL(svgBlob);
        // console.log(url);
        // if (typeof player !== 'undefined') {
        //     // the variable is defined
        //     player.destroy();
        // }
        if (this.textures.exists('player')) {
            this.textures.removeKey('player');
            this.textures.remove('player');
        }
        // if (this.textures.exists('more')) {
        //     this.textures.removeKey('more');
        //     this.textures.remove('more');
        // }
        // if (this.textures.exists('less')) {
        //     this.textures.removeKey('less');
        //     this.textures.remove('less');
        // }
        // if (this.textures.exists('menu')) {
        //     this.textures.removeKey('menu');
        //     this.textures.remove('menu');
        // }
        // if (this.textures.exists('back')) {
        //     this.textures.removeKey('back');
        //     this.textures.remove('back');
        // }
        // if (this.textures.exists('background')) {
        //     this.textures.removeKey('background');
        //     this.textures.remove('background');
        // }
        // if (this.textures.exists('customizeheader')) {
        //     this.textures.removeKey('customizeheader');
        //     this.textures.remove('customizeheader');
        // }
        console.log(this.customizescreen);
        this.customizescreen.clear();
        this.create();
        console.log(this.customizescreen);
        this.load.svg('player', url, { width: w / 2, height: h });
        this.load.on('filecomplete', function () {
            let player = this.customizescreen.create(w * 0.3, h / 2, 'player');
        }, this);
        this.load.start();
    }

    preload() {
        // this.load.image('back', 'assets/images/buttons/back.png');
        this.load.image('customizeheader', 'assets/images/buttons/customize-header.png');
        this.load.image('less', 'assets/images/buttons/less.png');
        this.load.image('more', 'assets/images/buttons/more.png');
    }

    create() {
        this.customizescreen = this.add.group();
        
        var sceneMainMenu = this.scene.get('MainMenu');

        var click2 = this.sound.add('click2');

        var background = this.customizescreen.create(w / 2, h / 2, 'background');
        var back = this.customizescreen.create(50, 50, 'back').setInteractive().setScale(0.7 * scale);
        var customizeheader = this.customizescreen.create(w * 0.75, h * 0.20, 'customizeheader').setScale(scale);
        var menu = this.customizescreen.create(w * 0.75, h * 0.54, 'menu').setScale(scale, 1.2 * scale);
        var less1 = this.customizescreen.create(w * 0.65, h * 0.29, 'less').setInteractive().setScale(0.6 * scale);
        var more1 = this.customizescreen.create(w * 0.85, h * 0.29, 'more').setInteractive().setScale(0.6 * scale);
        var less2 = this.customizescreen.create(w * 0.65, h * 0.39, 'less').setInteractive().setScale(0.6 * scale);
        var more2 = this.customizescreen.create(w * 0.85, h * 0.39, 'more').setInteractive().setScale(0.6 * scale);
        var less3 = this.customizescreen.create(w * 0.65, h * 0.49, 'less').setInteractive().setScale(0.6 * scale);
        var more3 = this.customizescreen.create(w * 0.85, h * 0.49, 'more').setInteractive().setScale(0.6 * scale);
        var less4 = this.customizescreen.create(w * 0.65, h * 0.59, 'less').setInteractive().setScale(0.6 * scale);
        var more4 = this.customizescreen.create(w * 0.85, h * 0.59, 'more').setInteractive().setScale(0.6 * scale);
        var less5 = this.customizescreen.create(w * 0.65, h * 0.69, 'less').setInteractive().setScale(0.6 * scale);
        var more5 = this.customizescreen.create(w * 0.85, h * 0.69, 'more').setInteractive().setScale(0.6 * scale);
        var less6 = this.customizescreen.create(w * 0.65, h * 0.79, 'less').setInteractive().setScale(0.6 * scale);
        var more6 = this.customizescreen.create(w * 0.85, h * 0.79, 'more').setInteractive().setScale(0.6 * scale);

        var text1 = this.add.text(w * 0.725, h * 0.275, "Slot 1", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });
        var text2 = this.add.text(w * 0.722, h * 0.375, "Slot 2", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });
        var text3 = this.add.text(w * 0.722, h * 0.475, "Slot 3", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });
        var text4 = this.add.text(w * 0.722, h * 0.575, "Slot 4", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });
        var text5 = this.add.text(w * 0.722, h * 0.675, "Slot 5", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });
        var text6 = this.add.text(w * 0.722, h * 0.775, "Slot 6", { fontFamily: "KenVector Future", fontSize: 26, color: "#000" });

        // var player = sceneMainMenu.player;
        let player = this.customizescreen.create(w * 0.3, h / 2, 'player')

        // this.customizescreen.add(click2);
        // this.customizescreen.add(background);
        // this.customizescreen.add(back);
        // this.customizescreen.add(customizeheader);
        // this.customizescreen.add(menu);
        // this.customizescreen.add(less1);
        // this.customizescreen.add(more1);
        // this.customizescreen.add(less2);
        // this.customizescreen.add(more2);
        // this.customizescreen.add(less3);
        // this.customizescreen.add(more3);
        // this.customizescreen.add(less4);
        // this.customizescreen.add(more4);
        // this.customizescreen.add(less5);
        // this.customizescreen.add(more5);
        // this.customizescreen.add(less6);
        // this.customizescreen.add(more6);
        // this.customizescreen.add(text1);
        // this.customizescreen.add(text2);
        // this.customizescreen.add(text3);
        // this.customizescreen.add(text4);
        // this.customizescreen.add(text5);
        // this.customizescreen.add(text6);
        // this.customizescreen.add(player);

        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {
            click2.play();
            this.scene.start('MainMenu');
            // sceneMainMenu.fetchSVG();

        }, this);

        less1.on('pointerdown', function (ev) {
            click2.play();
            numericTraits[4] -= 10;
            if (numericTraits[4] < 0) {
                numericTraits[4] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        less2.on('pointerdown', function (ev) {
            click2.play();
            numericTraits[5] -= 10;
            if (numericTraits[5] < 0) {
                numericTraits[5] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        less3.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[0] -= 3;
            if (equippedWearables[0] < 0) {
                equippedWearables[0] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        less4.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[1] -= 3;
            if (equippedWearables[1] < 0) {
                equippedWearables[1] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        less5.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[2] -= 3;
            if (equippedWearables[2] < 0) {
                equippedWearables[2] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        less6.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[3] -= 3;
            if (equippedWearables[3] < 0) {
                equippedWearables[3] = 100;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);

        more1.on('pointerdown', function (ev) {
            click2.play();
            numericTraits[4] += 10;
            if (numericTraits[4] > 100) {
                numericTraits[4] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        more2.on('pointerdown', function (ev) {
            click2.play();
            numericTraits[5] += 10;
            if (numericTraits[5] > 100) {
                numericTraits[5] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        more3.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[0] += 3;
            if (equippedWearables[0] > 100) {
                equippedWearables[0] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        more4.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[1] += 3;
            if (equippedWearables[1] > 100) {
                equippedWearables[1] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        more5.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[2] += 3;
            if (equippedWearables[2] > 100) {
                equippedWearables[2] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
        more6.on('pointerdown', function (ev) {
            click2.play();
            equippedWearables[3] += 18;
            if (equippedWearables[3] > 100) {
                equippedWearables[3] = 0;
            }
            this.fetchSVG(numericTraits, equippedWearables);
        }, this);
    }
    update() {

    }
}
