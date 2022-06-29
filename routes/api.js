const express = require("express");
const apiRouter = express.Router();
const categoriesRouter = require("./categories");
const mondayRouter = require("./monday");
const ticketsRouter = require("./tickets");

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/tickets', ticketsRouter);
apiRouter.use('/monday', mondayRouter);

module.exports = apiRouter;