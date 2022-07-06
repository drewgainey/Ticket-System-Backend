const express = require("express");
const categoriesRouter = express.Router();

const categories  = require("../util/categories")


//get all categories 
categoriesRouter.get('/', (req, res, next) => {
    res.status(200).send(categories);
});

module.exports = categoriesRouter;