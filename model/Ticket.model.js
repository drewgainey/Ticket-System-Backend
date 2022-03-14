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
// get comments for an individual ticket
//add comment to an individual ticket
//update an individual by tickets status. Other changes to the ticket should be documented in the comments
//no delete methods as of yet. Right now there is no need to delete tickets

module.exports = { getAllTickets, addTicket };
