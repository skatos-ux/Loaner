// Utilitaire permettant de créer à base de données à partir du contenu du fichier "init_db.sql"

import { readFileSync } from 'fs';
import { verbose } from 'sqlite3';
import * as config from '../config.json';

const sqlite = verbose();

const sqlContent = readFileSync('init_db.sql').toString();
const db = new sqlite.Database(config.dbFile, (err) => {
    if(err) {
        handleError(err);
    }
});

const lines = sqlContent.toString().split(';');
const logQueries = process.argv.includes("--log-queries");
const execute = process.argv.includes("--exec");

if(execute) {
    console.log("Création de la base de données...");

    createDatabase().then(closeDatabase)

} else {
    process.on('exit', closeDatabase);
}

function executeQuery(query : string) : Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if(err) {
                handleError(err);
                reject(err);
            }

            resolve();
        })
    });
}

async function createDatabase() : Promise<void> {
    
    await executeQuery('BEGIN TRANSACTION');

    for(let query of lines) {
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
            
            await executeQuery(query);
        }
    }
    
    await executeQuery('COMMIT');
}

function closeDatabase() : void {
    db.close((err) => {

        if (err) {
            handleError(err);
        }
        
        if(execute) {
            console.log('Création terminée');
        }
    });
}

function handleError(err: Error) : void {
    if(execute) {
        console.error(err);
        process.exit(-1);
    } else {
        throw err;
    }
}

export default createDatabase;