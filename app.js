require("dotenv").config();
const { getJobs } = require("finn-jobb");
const { Pool } = require("pg");

async function insertJobsToDB(jobs) {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  const client = await pool.connect();
  try {
    for (let job of jobs) {
      await client.query(
        "INSERT INTO jobs(id, company, dato, lokasjon, tekst, link) VALUES ($1, $2, $3, $4, $5, $6)",
        [job.id, job.company, job.dato, job.lokasjon, job.tekst, job.link]
      );
    }
    console.log(`Inserted ${jobs.length} jobs to database`);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

async function myAwesomeFunc() {
  const jobs = await getJobs({
    getFinnJobs: false,
    getKode24Jobs: true,
  });
  await insertJobsToDB(jobs);
}

myAwesomeFunc();
