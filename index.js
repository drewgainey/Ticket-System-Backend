require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");

const port = process.env.PORT || 3001;

//handle CORS error
app.use(cors());

//logger
app.use(morgan("dev"));

//body parser
app.use(bodyParser.json());

//connect to mongodb
const mongodbURL = process.env.MONGODB_URL;
console.log(mongodbURL);
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Successfuly connected to MongoDB"))
  .catch((err) => console.log(`error on db connection: ${err}`));

//mount API router
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${3001}`);
});
