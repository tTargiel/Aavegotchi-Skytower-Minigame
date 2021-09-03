class Leaderboard extends Phaser.Scene {

    constructor() {
        super({ key: 'Leaderboard' });
    }

    preload() {
        // this.load.image('back', 'assets/images/buttons/back.png');
    }

    create() {
        var click2 = this.sound.add('click2');

        var background = this.add.image(w / 2, h / 2, 'background');
        var back = this.add.image(50, 50, 'back').setInteractive().setScale(0.7 * scale);
        this.input.manager.enabled = true;

        back.on('pointerdown', function (ev) {
            click2.play();
            this.scene.start('MainMenu');

        }, this);
    }
}
