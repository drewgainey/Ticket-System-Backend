const { TicketSchema } = require("./Ticket.Schema");

// get all tickets
const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({})
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
//add a ticket
const addTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
//get individual ticket by ticket number
const getTicketByNumber = (ticketNum) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ ticketNum: ticketNum })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
// get comments for an individual ticket
const getTicketCommentsByNumber = (ticketNum) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ ticketNum: ticketNum }, "comments")
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
//add comment to an individual ticket
const addCommentToTicketByNumber = (ticketNum, user, notes) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { ticketNum: ticketNum },
        {
          $push: {
            comments: { user, notes },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
//update an individual by tickets status. Other changes to the ticket should be documented in the comments
const updateTicketStatusByNumber = (ticketNum, status) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { ticketNum: ticketNum },
        { status: status }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
//no delete methods as of yet. Right now there is no need to delete tickets

module.exports = {
  getAllTickets,
  addTicket,
  getTicketByNumber,
  updateTicketStatusByNumber,
  getTicketCommentsByNumber,
  addCommentToTicketByNumber,
};
