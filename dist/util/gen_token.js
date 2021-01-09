// Utilitaire permettant de génerer un token JWT

const jwt = require('jsonwebtoken');
const readline = require('readline');

const config = require('../config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("ID de l'utilisateur : ", (userID) => {
    if(userID.length != 7) {
        console.error("L'ID utilisateur doit faire 7 caractères !");
        rl.close();
        process.exit();
    }

    rl.question("Utilisateur administrateur (y/n) ? : ", (admin) => {
        if(admin != "y" && admin != "n") {
            console.error("La réponse doit être y ou n");
            rl.close();
            process.exit();
        }

        const token = jwt.sign({ id: userID, admin: admin == "y" }, config.jwtSecret, {
            expiresIn: "1h"
        });

        console.log("Token généré : " + token);

        rl.close();
    });
});
