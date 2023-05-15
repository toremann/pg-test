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
  const { lokasjon, order } = req.query;
  let query = "SELECT * FROM jobs";
  let params = [];

  if (lokasjon) {
    query += " WHERE lokasjon = $1";
    params.push(lokasjon);
  }

  if (order === "last") {
    query += " ORDER BY to_date(dato, 'DD/MM/YYYY') DESC LIMIT 1";
  }

  if (order === "today") {
    if (lokasjon) {
      query += " AND to_date(dato, 'DD/MM/YYYY') = current_date";
    } else {
      query += " WHERE to_date(dato, 'DD/MM/YYYY') = current_date";
    }
  }

  console.log("SQL Query: ", query, params);

  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
