import pg from "pg"
import env from "dotenv"

env.config()

const db = new pg.Client({
    user: process.env.USER_DB,
    host: "localhost",
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export default db;