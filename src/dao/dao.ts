import { verbose } from 'sqlite3';
import * as config from '../../config.json';

const sqlite = verbose();
const db = new sqlite.Database(config.dbFile);

export default abstract class DAO<T> {

    /*  A faire implémenter par la classe fille
        Permet de transformer une ligne de la base de donnée en objet du modèle */
    public abstract rowToModel(row: any) : T;

    /*  Pour obtenir une seule ligne d'une requête
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getOneRow(sqlQuery : string, params : any = []) : Promise<T> {
        return this.getOneRowNoCast(sqlQuery, params).then((row) => { return this.rowToModel.bind(this)(row); });
    }

    /*  Pour obtenir une seule ligne d'une requête mais sans conversion vers un objet du modèle
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getOneRowNoCast(sqlQuery : string, params : any = []) : Promise<any> {
        return new Promise((resolve, reject) => {
            db.get(sqlQuery, params, (err, row) => {
                if (err) {
                    reject(err);
                } else if(row == null) {
                    reject(new Error("Cannot find results"));
                } else {
                    resolve(row);
                }
            });
        });
    }

    /*  Pour obtenir toutes les lignes d'une requête
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getAllRows(sqlQuery : string, params : any = []) : Promise<T[]> {
        return this.getAllRowsNoCast(sqlQuery, params).then((rows) => { return rows.map(this.rowToModel.bind(this)); })
    }

    /*  Pour obtenir toutes les lignes d'une requête mais sans conversion vers un objet du modèle
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected getAllRowsNoCast(sqlQuery : string, params : any = []) : Promise<any[]> {
        return new Promise((resolve, reject) => {
            db.all(sqlQuery, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /*  Pour simplement exécuter une requête
        sqlQuery : Requête SQL
        params : Paramètre de la requête préparée, peut être ignoré */
    protected runQuery(sqlQuery : string, params : any) : Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(sqlQuery, params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}