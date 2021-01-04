const bcrypt = require('bcryptjs');
const readline = require('readline');

const config = require('./config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Mot de passe à hacher : ', (password) => {

    console.log("Mot de passe haché :");
    console.log(bcrypt.hashSync(password, config.hashSaltRounds));

    rl.close();
});