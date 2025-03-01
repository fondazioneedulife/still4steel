import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "memodb",
  password: "postgres",
  port: 5432,
});

console.log("DB_PASSWORD:", pool.user);


pool.connect()
  .then(() => console.log('Database connesso con successo'))
  .catch(err => console.error('Errore di connessione al DB:', err));

export default pool;