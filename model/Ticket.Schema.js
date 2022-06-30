const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { dateFormat } = require("../util/dateFormat")

const TicketSchema = new Schema({
  ticketNum: Number,
  dateSubmitted: { type: String, default: dateFormat() },
  issue: String,
  issueDetails: String,
  status: { type: String, default: "Not Started"},
  priority: String,
  category: String,
  submittedBy: String,
  comments: [
    {
      date: { type: String, default: dateFormat() },
      user: String,
      notes: String,
    },
  ],
  pulseID: {type: String, default: ""},
});

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
