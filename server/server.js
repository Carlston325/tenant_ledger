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

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tenant_ledger");
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    res.send("failed");
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate the credentials (this is just an example, you'll need to implement real validation)
  const user = await User.findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  // Generate a JWT or session token if using one
  const token = generateJWT(user); // You'll need to implement token generation

  // Send success response with token
  res.json({ success: true, token });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
