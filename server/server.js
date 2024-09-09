import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

const PSQL_user = process.env.PSQL_user;
const PSQL_host = process.env.PSQL_host;
const PSQL_database = process.env.PSQL_database;
const PSQL_password = process.env.PSQL_password;
const PSQL_port = parseInt(process.env.PSQL_port, 10);

const db = new pg.Client({
  user: PSQL_user,
  host: PSQL_host,
  database: PSQL_database,
  password: PSQL_password,
  port: PSQL_port,
});
db.connect().catch((err) => {
  console.error("Failed to connect to the database:", err.stack);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
  console.log(PSQL_port);
});
