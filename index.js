require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./routes/api");

const port = process.env.PORT || 3001

//handle CORS error
app.use(cors());

//logger
app.use(morgan("dev"));

//body parser
app.use(bodyParser.json());

//mount API router
app.use('/api', apiRouter);


app.listen(port, () => {
    console.log(`API is ready on http://localhost:${3001}`);
});