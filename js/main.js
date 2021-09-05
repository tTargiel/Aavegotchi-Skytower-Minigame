// Connect to Moralis server
Moralis.initialize("ZJunkHLQecMCmFhN7NKYAZ76SgutQrCh7xh6wEyB");
Moralis.serverURL = "https://ymcm6oxklb9t.bigmoralis.com:2053/server";

var Skytower = Skytower || {};

var game;
var w = window.innerWidth;
var h = window.innerHeight;
var scale = h / 968;
var tilesize = 48 * scale;

var platformsXcoordinates = [];
var platformsYcoordinates = [];
var platforms;
var platform = 0;
var amountOfPlatforms = Math.floor((h - (40 * scale)) / (tilesize * 3));
var tilescale = tilesize / (48 * scale);

var vel, tilemin, tilemax;

var cont = 'container';
var coll = 'collider';
for (let i = 0; i < 10; i++) {
    eval("var "+cont+i);
    eval("var "+coll+i);
}
for (let j = 0; j < 10; j++) {
    eval("var tile"+j);
}


// var container0, container1, container2, container3, container4, container5, container6, container7, container8, container9;
// var collider0, collider1, collider2, collider3, collider4, collider5, collider6, collider7, collider8, collider9;
var cursors, player, ground, collider;

let left = Math.floor(w * 0.2);
let right = Math.floor(w * 0.8) - 192;
const positions = [];

let numericTraits = [0, 0, 0, 0, 0, 0]; // UI to change the traits
let equippedWearables = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: {
            //     y: 500
            // },
            debug: true
        }
    },
    scene: [MainMenu, Game, Customize, Leaderboard],
    audio: {
        disableWebAudio: true
    }
};

function launch() {
    let user = Moralis.User.current();
    if (!user) {
        console.log("PLEASE LOG IN WITH METAMASK!");
    } else {
        console.log(user.get("ethAddress") + " logged in");

        document.getElementById("gradient").style.display = "none";
        document.getElementById("contents").style.display = "none";

        var game = new Phaser.Game(config);
    }
}
launch();

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let x = 0; x < 6; x++) {
    positions[x] = randomIntFromInterval(left, right);
}
