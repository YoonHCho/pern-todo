const Pool = require("pg").Pool; // Common JS
// import { Pool } from "pg"; // ES Module
require("dotenv").config();

const { PG_PW } = process.env;

const pool = new Pool({
  user: "postgres",
  password: PG_PW,
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
