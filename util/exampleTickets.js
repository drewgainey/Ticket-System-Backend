const exampleTickets = [
  {
    ticketNum: 1,
    dateSubmitted: "3/1/2022",
    issue: "P2P is broken yet again",
    issueDetails: "P2P just kinda sucks",
    status: "Pending",
    category: "Accounts Payable",
    submittedBy: "drewgainey@gmail.com",
    comments: [
      {
        date: "3/1/22",
        user: "drewgainey@gmail.com",
        notes: "test first comment",
      },
      {
        date: "3/2/22",
        user: "drewgainey@gmail.com",
        notes: "test second comment",
      },
    ],
  },
  {
    ticketNum: 2,
    dateSubmitted: "3/1/2022",
    issue: "Cant log on",
    issueDetails: "honest just forgot my password",
    status: "Pending",
    category: "Log in issues",
    submittedBy: "drewgainey@gmail.com",
    comments: [
      {
        date: "3/1/22",
        user: "drewgainey@gmail.com",
        notes: "ticket 2 first comment",
      },
      {
        date: "3/2/22",
        user: "drewgainey@gmail.com",
        notes: "ticket 2 second commetn",
      },
      {
        date: "3/7/22",
        user: "drewgainey@gmail.com",
        notes: "ticket 2 3rd comment",
      },
    ],
  },
];

module.exports = exampleTickets;