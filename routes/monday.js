const express = require("express");
const mondayRouter = express.Router();

mondayRouter.post("/", (req, res) => {
    const { challenge } = req.body;
    console.log(req.body);
    res.status(200).send(JSON.stringify({challenge: challenge}));
  });
module.exports = mondayRouter;