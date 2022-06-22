const express = require('express');
const router = express.Router();
const bot = require("../Data/databot");

/**
 * This file contains the gas route for the REST API. 
 * As of now there are no other routes
 */

router.get("/", (req, res , next)=> {
    res.send("Nothing to see here");
})



router.get("/:coin" , (req, res, next) => {
    const coin  = req.params.coin;


})



module.exports = router;
