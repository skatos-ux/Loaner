import { verbose } from 'sqlite3';

const sqlite = verbose();
const db = new sqlite.Database('database.db');

abstract class DAO<T> {

    // A faire implémenter par la classe fille
    // Permet de transformer une ligne de la base de donnée en objet du modèle
    public abstract rowToModel(row: any) : T;

    // Pour obtenir une seule ligne
    protected getOneRow(sqlQuery : string, params : any = []) : Promise<T> {
        return new Promise((resolve, reject) => {
            db.get(sqlQuery, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.rowToModel(row));
                }
            });
        });
    }

    // Pour obtenir toutes les lignes
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

    // Pour simplement exécuter une requête
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