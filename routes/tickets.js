const express = require("express");
const ticketsRouter = express.Router();
const Ticket = require("../model/Ticket.Schema");
const { addTicket, getAllTickets } = require("../model/Ticket.model")

const tickets = require("../util/exampleTickets");

//check if ticket number param is valid
ticketsRouter.param("ticketNum", (req, res, next, id) => {
  const ticketExists = tickets.some((ticket) => {
    if (ticket.ticketNum === parseInt(id)) {
      return true;
    }
  });

  if (ticketExists) {
    next();
  } else {
    const err = new Error("invalid ticket number");
    err.status = 404;
    return next(err);
  }
});

//get all tickets
ticketsRouter.get("/", async (req, res, next) => {
  const result = await getAllTickets();
  res.status(200).send(result);
});

//add a ticket
ticketsRouter.post("/", async (req, res, next) => {
  const testTicket = {
    ticketNum,
    dateSubmitted,
    issue,
    issueDetails,
    status,
    category,
    submittedBy
  } = req.body; 

  const result = await addTicket(testTicket);
  
  res.status(201).send(testTicket);
});

//get individual ticket by ticket number
ticketsRouter.get("/:ticketNum", (req, res, next) => {
  const ticket = tickets.find(
    (ticket) => ticket.ticketNum === parseInt(req.params.ticketNum)
  );
  res.status(200).send(ticket);
});
// get comments for an individual ticket
ticketsRouter.get("/:ticketNum/getComments", (req, res, next) => {
  const ticket = tickets.find(
    (ticket) => ticket.ticketNum === parseInt(req.params.ticketNum)
  );
  const comments = ticket.comments;
  res.status(200).send(comments);
});

//add comment to an individual ticket
ticketsRouter.put("/:ticketNum/newComment", (req, res, next) => {
  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.ticketNum === parseInt(req.params.ticketNum)
  );
  tickets[ticketIndex].comments.push(req.body);
  res.status(200).send(tickets[ticketIndex]);
});

//update an individual by tickets status. Other changes to the ticket should be documented in the comments
ticketsRouter.put("/:ticketNum", (req, res, next) => {
  const ticketIndex = tickets.findIndex(
    (ticket) => ticket.ticketNum === parseInt(req.params.ticketNum)
  );
  tickets[ticketIndex].status = req.body.status;
  res.status(200).send(tickets[ticketIndex]);
});
//no delete methods as of yet. Right now there is no need to delete tickets

//error handling
ticketsRouter.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  res.status(err.status).send(err.message);
});

module.exports = ticketsRouter;
