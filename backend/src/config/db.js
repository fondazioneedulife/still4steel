import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

// console.log(process.env.DB_USER, " - ", process.env.DB_HOST, " - ", process.env.DB_NAME, " - ", process.env.DB_PASSWORD, " - ", process.env.DB_PORT);
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});



pool.connect()
  .then(() => console.log('Database connesso con successo'))
  .catch(err => console.error('Errore di connessione al DB:', err));


export default pool;