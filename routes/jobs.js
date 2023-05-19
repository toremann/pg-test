const express = require("express");
const router = express.Router();
const pool = require("../db/connect");

router.get("/jobs", async (req, res) => {
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

router.get("/stats", async (req, res) => {
  let query =
    "SELECT COUNT(*) AS total_rows, " +
    "SUM(CASE WHEN id LIKE 'finn_%' THEN 1 ELSE 0 END) AS finn_rows, " +
    "SUM(CASE WHEN id LIKE 'kode24_%' THEN 1 ELSE 0 END) AS kode24_rows " +
    "FROM jobs";

  try {
    const { rows } = await pool.query(query);
    const { total_rows, finn_rows, kode24_rows } = rows[0];
    res.json({
      total_rows: parseInt(total_rows),
      finn_rows: parseInt(finn_rows),
      kode24_rows: parseInt(kode24_rows),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//   {
//     "total_rows": 763,
//     "finn_rows": 729,
//     "kode24_rows": 34
// }

module.exports = router;
