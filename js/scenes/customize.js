class Customize extends Phaser.Scene {

    constructor() {
        super({ key: 'Customize' });
    }

    preload() {
        // this.load.image('back', 'assets/images/buttons/back.png');
    }

    create() {
        var sceneMainMenu = this.scene.get('MainMenu');
        var click2 = this.sound.add('click2');

        var background = this.add.image(w / 2, h / 2, 'background');
        var back = this.add.image(50, 50, 'back').setInteractive().setScale(0.7 * scale);
        var menu = this.add.image(w * 0.75, h * 0.5, 'menu').setScale(scale, 1.2 * scale);

        

        let player = this.add.image(w * 0.3, h / 2, 'player');
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {
            click2.play();
            // this.scene.start('MainMenu');
            sceneMainMenu.fetchSVG();

        }, this);
    }
}
