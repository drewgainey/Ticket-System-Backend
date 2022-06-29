const express = require("express");
const mondayRouter = express.Router();

mondayRouter.get("/", (req, res) => {
    res.send("hello world");
});

mondayRouter.post("/", (req, res) => {
    const challenge = req.body.challenge;
    console.log(req);
    res.status(200).send(JSON.stringify({challenge: challenge}));
  });
module.exports = mondayRouter;