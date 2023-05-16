-- Create a table for job objects

CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  dato TEXT NOT NULL,
  lokasjon TEXT NOT NULL,
  tekst TEXT NOT NULL,
  link TEXT NOT NULL
);

-- Create a table for postcodes
-- Match lokasjon and JOIN

CREATE TABLE postcodes (
    id SERIAL PRIMARY KEY,
    po VARCHAR(4) NOT NULL,
    lokasjon VARCHAR(100) NOT NULL
);

-- SELECT j.id, j.company, j.dato, j.lokasjon, j.tekst, j.link, p.po
-- FROM jobs j
-- JOIN postcodes p ON j.lokasjon = p.lokasjon;
