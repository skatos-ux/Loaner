// Utilitaire permettant de créer à base de données à partir du contenu du fichier "init_db.sql"

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const config = require('../config.json');

const sqlContent = fs.readFileSync('init_db.sql').toString();
const db = new sqlite3.Database(config.dbFile, (err) => {
    if(err) {
        handleError(err);
    }
});

const lines = sqlContent.toString().split(';');
const logQueries = process.argv.includes("--log-queries");
const execute = process.argv.includes("--exec");

if(execute) {
    console.log("Création de la base de données...");

    createDatabase();

    closeDatabase();
} else {
    process.on('exit', closeDatabase);
}

function createDatabase() {
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
                    if(err) {
                        handleError(err);
                    }
                });
            }
        });
        
        db.run('COMMIT');
    });
}

function closeDatabase() {
    db.close((err) => {

        if (err) {
            handleError(err);
        }
        
        if(execute) {
            console.log('Création terminée');
        }
    });
}

function handleError(err) {
    if(execute) {
        console.error(err);
        process.exit(-1);
    } else {
        throw err;
    }
}

module.exports = createDatabase;