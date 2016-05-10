import levelup from 'levelup';
import path from 'path';

const db = levelup(path.resolve(__dirname, '../database/db.level'));

export default db;
