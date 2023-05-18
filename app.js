require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
const jobRoutes = require("./routes/index");

app.use("/", jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
