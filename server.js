const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");

const PORT = process.env.PORT || 3004;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// here's  routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});