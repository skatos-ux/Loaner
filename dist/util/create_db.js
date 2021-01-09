"use strict";
// Utilitaire permettant de créer à base de données à partir du contenu du fichier "init_db.sql"
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const sqlite3_1 = require("sqlite3");
const config = __importStar(require("../src/config.json"));
const sqlite = sqlite3_1.verbose();
const logQueries = process.argv.includes("--log-queries");
const execute = process.argv.includes("--exec");
let sqlFile = 'init_db.sql';
console.log(process.argv);
if (process.argv.length > 2 && fs_1.existsSync(process.argv[2])) {
    sqlFile = process.argv[2];
}
const sqlContent = fs_1.readFileSync(sqlFile).toString();
const db = new sqlite.Database(config.dbFile, (err) => {
    if (err) {
        handleError(err);
    }
});
const lines = sqlContent.toString().split(';');
if (execute) {
    console.log("Création de la base de données...");
    createDatabase().then(closeDatabase);
}
else {
    process.on('exit', closeDatabase);
}
function executeQuery(query) {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                handleError(err);
                reject(err);
            }
            resolve();
        });
    });
}
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield executeQuery('BEGIN TRANSACTION');
        for (let query of lines) {
            if (query && query.trim()) {
                query = query.trim();
                if (query.startsWith("--")) {
                    const pos = query.indexOf("\n");
                    if (pos != -1) {
                        query = query.substring(pos + 1);
                    }
                    else {
                        return;
                    }
                }
                query = query.replace("\n", "");
                if (logQueries) {
                    console.log(query);
                }
                yield executeQuery(query);
            }
        }
        yield executeQuery('COMMIT');
    });
}
function closeDatabase() {
    db.close((err) => {
        if (err) {
            handleError(err);
        }
        if (execute) {
            console.log('Création terminée');
        }
    });
}
function handleError(err) {
    if (execute) {
        console.error(err);
        process.exit(-1);
    }
    else {
        throw err;
    }
}
exports.default = createDatabase;
