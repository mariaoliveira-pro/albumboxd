import { DatabaseSync } from 'node:sqlite';
import path from 'node:path'

const caminho = path.join(import.meta.dirname, 'database.sqlite')
const database = new DatabaseSync(caminho);

database.exec('PRAGMA foreign_keys = ON;');

export default database;
