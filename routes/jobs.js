const express = require('express');
const router = express.Router();
const pool = require('../db/connect')

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

module.exports = router;
