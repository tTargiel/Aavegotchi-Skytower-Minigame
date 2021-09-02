class Customize extends Phaser.Scene {

    constructor() {
        super({ key: 'Customize' });
    }

    preload() {
        // this.load.image('back', 'assets/images/buttons/back.png');
    }

    create() {
        var click1 = this.sound.add('click1');

        var back = this.add.image(50, 50, 'back').setInteractive().setScale(0.7 * scale);
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {
            click1.play();
            this.scene.start('MainMenu');

        }, this);
    }
}
