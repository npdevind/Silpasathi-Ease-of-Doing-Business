import { Pool } from "pg";

const con = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  max: 60,
  idleTimeoutMillis: 30,
});

export default con;
