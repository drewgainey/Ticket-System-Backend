const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  ticketNum: Number,
  dateSubmitted: String,
  issue: String,
  issueDetails: String,
  status: String,
  category: String,
  submittedBy: String
});

module.exports = {
    TicketSchema: mongoose.model("Ticket", TicketSchema),
  };

