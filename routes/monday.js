const express = require("express");
const mondayRouter = express.Router();

mondayRouter.post("/", (req, res) => {
    const { challenge, pulseId, columnTitle, value} = req.body;
    console.log(`pulse ID:${pulseId}`);
    console.log(`columnTitle:${columnTitle}`);
    console.log(value);
    res.status(200).send(JSON.stringify({challenge: challenge}));
  });
module.exports = mondayRouter;