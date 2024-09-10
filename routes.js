
const express = require('express')

const { handlePayment, handleBooking, handleContact } = require('./controller');

const router = express.Router()


// Route handler

router.post("/charge", handlePayment);
router.post("/booknow", handleBooking);
router.post("/contactus", handleContact);


module.exports = router
