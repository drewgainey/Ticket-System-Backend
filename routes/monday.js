const express = require("express");
const { updateTicketStatusByPulseID } = require("../model/Ticket.model");
const mondayRouter = express.Router();

mondayRouter.post("/", (req, res) => {
  const { challenge } = req.body;
  const { pulseId, columnTitle, value } = req.body.event;
  console.log(req.body);
  console.log(`pulse ID:${pulseId}`);
  console.log(`columnTitle:${columnTitle}`);
  console.log(value);
  if (columnTitle === "Status") {
    updateTicketStatusByPulseID(pulseId, value.label.text);
  }
  res.status(200).send(JSON.stringify({ challenge: challenge }));
});
module.exports = mondayRouter;
