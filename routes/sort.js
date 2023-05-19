const express = require("express");
const router = express.Router();
const pool = require('../db/connect')
  
  router.get("/sort", async (req, res) => {
    const { sort, order } = req.query;
    let query = "SELECT * FROM jobs";
  
    if (sort) {
      const validSortColumns = ["company", "dato", "lokasjon"];
  
      if (validSortColumns.includes(sort)) {
        if (sort === "dato") {
          query += ` ORDER BY to_date(dato, 'DD/MM/YYYY')`;
        } else {
          query += ` ORDER BY ${sort}`;
        }
  
        if (order && order.toLowerCase() === "desc") {
          query += ` DESC`;
        } else {
          query += ` ASC`;
        }
      } else {
        res.status(400).json({ error: "Invalid sort parameter" });
        return;
      }
    }
  
    console.log("SQL Query:", query);
  
    try {
      const { rows } = await pool.query(query);
      res.render("index", { jobs: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
