import { Pool } from "pg";

const pg = new Pool({
  user: process.env.POSTGRES_USER,
  host: "0.0.0.0",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export default pg;
