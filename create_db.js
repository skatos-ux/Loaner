const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const config = require('./config.json');

const sqlContent = fs.readFileSync('./init_db.sql').toString();
const db = new sqlite3.Database(config.dbFile);

const lines = sqlContent.toString().split(';');
const logQueries = process.argv[2] && process.argv[2] == "--log";

console.log("Création de la base de données...");

db.serialize(() => {

    db.run('BEGIN TRANSACTION');

    lines.forEach((query) => {
        if(query && query.trim()) {
            query = query.trim();

            if(query.startsWith("--")) {
                const pos = query.indexOf("\n");

                if(pos != -1) {
                    query = query.substring(pos + 1);
                } else {
                    return;
                }
            }

            query = query.replace("\n", "");

            if(logQueries) {
                console.log(query);
            }

            db.run(query, (err) => {
                if(err) throw err;
            });
        }
    });
    
    db.run('COMMIT');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    
    console.log('Création terminée');
});