const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const config = require('./config.json');

const sqlContent = fs.readFileSync('./init_db.sql').toString();
const db = new sqlite3.Database(config.dbFile);

const lines = sqlContent.toString().split(';');

console.log("Création de la base de données...");

db.serialize(() => {

    db.run('BEGIN TRANSACTION');

    lines.forEach((query) => {
        if(query && query != '\n') {
            query = query.trim();

            db.run(query, (err) => {
                if(err) throw err;
            });
        }
    });
    
    db.run('COMMIT');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    
    console.log('Création terminée');
});