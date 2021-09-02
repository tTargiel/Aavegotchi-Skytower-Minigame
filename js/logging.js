// Implementation of login and logout buttons
async function logIn() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.Web3.authenticate();
        launch();
    }
    console.log("Logged in user: ", user);
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("Logged out");
    location.reload();
}

document.getElementById("buttonLogin").onclick = logIn;
document.getElementById("buttonLogout").onclick = logOut;
