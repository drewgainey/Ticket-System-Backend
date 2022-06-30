const { TicketSchema } = require("./Ticket.Schema");
const fetch = require("node-fetch");

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
      //update Monday.com
      const mondayPosting = () => {
        const date = new Date();
        const [withoutTime] = date.toISOString().split("T");

        fetch("https://api.monday.com/v2", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NzY0Nzc1OSwidWlkIjozMTUwMDg1MSwiaWFkIjoiMjAyMi0wNi0yOFQwMDo0OToyMy43NjdaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTI1NjEzMDUsInJnbiI6InVzZTEifQ.N-7fGOvqTJQ8nCYdV6HWo8vDHER9PmM5hOjv0WrkIDw",
          },
          body: JSON.stringify({
            query: `mutation {
            create_item(item_name: "${ticketObj.issue}", board_id: 2862638925, group_id: "group_title", column_values: \"{\\\"dropdown7\\\":\\\"${ticketObj.category}\\\",\\\"prority\\\":\\\"${ticketObj.priority}\\\",\\\"text3\\\":\\\"${ticketObj.submittedBy}\\\",\\\"date4\\\":\\\"${withoutTime}\\\"}\") {
              id
            }
          }`,
          }),
        })
          .then((res) => res.json())
          .then((res) =>
            TicketSchema.findOneAndUpdate(
              { ticketNum: ticketNum },
              { pulseID: res.data.create_item.id }
            )
          );
      };
      mondayPosting();
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
