function startingPlatforms() { //funkcja generująca pozycje startowych platform, i ona działa 
    for (let i = 0; i < amountOfPlatforms; i++) {
        platformsXcoordinates[i] = Math.floor((Math.random() * w) + 1);
        platformsYcoordinates[i] = Math.floor((Math.random() * (h * 0.75)) + 1);
    }
}
// function addingPlatforms() {
//     minIndex += 1;
//     amountOfPlatforms += 1;
//     platformsXcoordinates[amountOfPlatforms] = Math.floor((Math.random() * w) + 1);
//     platformsYcoordinates[amountOfPlatforms] = 0;
// }

class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ground', 'assets/images/tile_0133.png');
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

        startingPlatforms();
        platform = this.physics.add.staticGroup();
        
        for (let i = 0; i < amountOfPlatforms; i++) {
            console.log(platformsXcoordinates[i]);
        //     platforms.create(platformsXcoordinates[i], platformsYcoordinates[i], 'ground').setVelocity(Phaser.Math.Between(-200, 200), 20);
            platforms = platform.create(platformsXcoordinates[i], platformsYcoordinates[i], 'ground');
        }
    }
    // update() {
    //     for (let j = minIndex; j < amountOfPlatforms; j++) {
    //         platformsYcoordinates[j] += 10;
    //         platforms[j] = this.add.image(platformsXcoordinates[j], platformsYcoordinates[j], 'back');
    //     }
    // }
}
