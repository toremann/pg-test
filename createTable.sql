-- Create a table with columns

CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  dato TEXT NOT NULL,
  lokasjon TEXT NOT NULL,
  tekst TEXT NOT NULL,
  link TEXT NOT NULL
);
