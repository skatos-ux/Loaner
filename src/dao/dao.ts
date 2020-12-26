import { verbose } from 'sqlite3';
import * as config from '../../config.json';

const sqlite = verbose();
const db = new sqlite.Database(config.dbFile);

abstract class DAO<T> {

    /*  A faire implémenter par la classe fille
        Permet de transformer une ligne de la base de donnée en objet du modèle */
    public abstract rowToModel(row: any) : T;

    /*  Pour obtenir une seule ligne
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getOneRow(sqlQuery : string, params : any = []) : Promise<T> {
        return new Promise((resolve, reject) => {
            db.get(sqlQuery, params, (err, row) => {
                if (err) {
                    reject(err);
                } else if(row == null) {
                    reject(new Error("Cannot find results for this query"));
                } else {
                    resolve(this.rowToModel(row));
                }
            });
        });
    }

    /*  Pour obtenir toutes les lignes
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getAllRows(sqlQuery : string, params : any = []) : Promise<T[]> {
        return new Promise((resolve, reject) => {
            db.all(sqlQuery, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(this.rowToModel));
                }
            });
        });
    }

    /*  Pour simplement exécuter une requête
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected runQuery(sqlQuery : string, params : any) : Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(sqlQuery, params, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export {
    db,
    DAO
}