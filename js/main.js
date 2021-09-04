// Connect to Moralis server
Moralis.initialize("ZJunkHLQecMCmFhN7NKYAZ76SgutQrCh7xh6wEyB");
Moralis.serverURL = "https://ymcm6oxklb9t.bigmoralis.com:2053/server";

var Skytower = Skytower || {};

var w = window.innerWidth;
var h = window.innerHeight;
var scale = h / 968;
var platformsXcoordinates = [];
var platformsYcoordinates = [];
var platforms, platform;
var minIndex = 0;
var amountOfPlatforms = 5;
var i;

let numericTraits = [0, 0, 0, 0, 0, 0]; // UI to change the traits
let equippedWearables = [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
