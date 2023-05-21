require("dotenv").config();
const express = require("express");

path = require("path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.json());

const jobRoutes = require("./routes/jobs");
const viewRoutes = require("./routes/views");
const sortRoutes = require("./routes/sort");

app.use("/", jobRoutes);
app.use("/", viewRoutes);
app.use("/", sortRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
