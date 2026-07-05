require("dotenv").config();

const express = require("express");
const cors = require("cors");

const listRoutes = require("./routes/listRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/list", listRoutes);

app.use(errorHandler);

module.exports = app;