const express = require("express");
const ticketsRouter = express.Router();
const Ticket = require("../model/Ticket.Schema");
const {
  addTicket,
  getAllTickets,
  getTicketByNumber,
  updateTicketStatusByNumber,
  getTicketCommentsByNumber,
  addCommentToTicketByNumber,
} = require("../model/Ticket.model")

//get all tickets
ticketsRouter.get("/", async (req, res, next) => {
  const result = await getAllTickets();
  res.status(200).send(result);
});

//add a ticket
// check if ticketNum already exists
ticketsRouter.post("/", async (req, res, next) => {
  const { ticketNum } = req.body;
  const result = await getTicketByNumber(ticketNum);
  if (result.length !== 0) {
    const err = new Error("invalid ticket number");
    err.status = 400;
    return next(err);
  }
  next();
});
//if ticketNum doesn't already exist then post to the db
ticketsRouter.post("/", async (req, res, next) => {
  const newTicket = ({
    ticketNum,
    issue,
    issueDetails,
    category,
    submittedBy,
    comments,
  } = req.body);

  const result = await addTicket(newTicket);

  res.status(201).send(result);
});

//get individual ticket by ticket number
ticketsRouter.get("/:ticketNum", async (req, res, next) => {
  const ticketNum = parseInt(req.params.ticketNum);
  const result = await getTicketByNumber(ticketNum);

  if (result.length !== 1) {
    const err = new Error("invalid ticket number");
    err.status = 404;
    return next(err);
  }

  res.status(200).send(result);
});
// get comments for an individual ticket
ticketsRouter.get("/:ticketNum/getComments", async (req, res, next) => {
  const ticketNum = Number(req.params.ticketNum);
  const comments = await getTicketCommentsByNumber(ticketNum);

  res.status(200).send(comments);
});

//add comment to an individual ticket
ticketsRouter.put("/:ticketNum/newComment", async (req, res, next) => {
  const ticketNum = parseInt(req.params.ticketNum);
  const { user, notes } = req.body;

  const result = await addCommentToTicketByNumber(ticketNum, user, notes);

  if (!result) {
    const err = new Error("invalid ticket number");
    err.status = 404;
    return next(err);
  }
  res.status(200).send(result);
});

//update an individual by tickets status. Other changes to the ticket should be documented in the comments
ticketsRouter.put("/:ticketNum", async (req, res, next) => {
  const ticketNum = parseInt(req.params.ticketNum);
  const status = req.body.status;
  const result = await updateTicketStatusByNumber(ticketNum, status);
  if (!result) {
    const err = new Error("invalid ticket number");
    err.status = 404;
    return next(err);
  }
  //right now updateTicketStatusByNumber doesn't return the updated oobject. Wil probably need to correct this
  res.status(200).send(result);
});
//no delete methods as of yet. Right now there is no need to delete tickets

//get max ticket number
ticketsRouter.get("/maxTicketNumber", async (req, res, next) => {});

//error handling
ticketsRouter.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  res.status(err.status).send(err.message);
});

module.exports = ticketsRouter;
