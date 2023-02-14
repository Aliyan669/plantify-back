const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const DBURI = "mongodb+srv://aliyan:aliyan@cluster0.6ytuali.mongodb.net/test";
mongoose
  .connect(DBURI)
  .then((res) => console.log("mongo db Connect"))
  .catch((err) => console.log("DB Error", err));

const PORT = process.env.PORT || 5000;
app.use(cors()); //// AllOW CORS ORIGIN ///
app.use(express.json()); /// All REQ-BODY PARSER  /////

app.use(router);
app.listen(PORT, console.log(`server running on http://localhost:${PORT}`));
