import * as dotenv from "dotenv";
dotenv.config();
import { Pool } from 'pg';

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
  port: 5432
});

export default { async query (text: string, params: Array<any>, callback?: () => void) {
  return pool.query(text, params, callback)}
};