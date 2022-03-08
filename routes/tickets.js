const express = require("express");
const ticketsRouter = express.Router();

const tickets  = require("../util/exampleTickets");

//get all tickets
ticketsRouter.get("/", (req, res, next) => {
  res.status(200).send(tickets);
});

//add a ticket 
ticketsRouter.post("/", (req, res, next) => {
    const newTicket = req.body;
    tickets.push(newTicket);
    res.status(201).send(newTicket);
});

module.exports = ticketsRouter;
