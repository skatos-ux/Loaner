import { verbose } from 'sqlite3';

const sqlite = verbose();
const db = new sqlite.Database('database.db');

// ...

export default db;