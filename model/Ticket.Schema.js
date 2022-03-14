const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { dateFormat } = require("../util/dateFormat")

const TicketSchema = new Schema({
  ticketNum: Number,
  dateSubmitted: { type: String, default: dateFormat() },
  issue: String,
  issueDetails: String,
  status: { type: String, default: "Pending"},
  category: String,
  submittedBy: String,
  comments: [
    {
      date: { type: String, default: dateFormat() },
      user: String,
      notes: String,
    },
  ],
});

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
