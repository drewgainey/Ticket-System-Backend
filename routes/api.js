const express = require("express");
const apiRouter = express.Router();
const categoriesRouter = require("./categories");
const ticketsRouter = require("./tickets");

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/tickets', ticketsRouter);

module.exports = apiRouter;