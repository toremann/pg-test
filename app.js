require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.get("/jobs", async (req, res) => {
  const { lokasjon } = req.query;
  if (!lokasjon) {
    return res.status(400).json({ error: "Missing lokasjon parameter" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT * FROM jobs WHERE lokasjon = $1",
      [lokasjon]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
