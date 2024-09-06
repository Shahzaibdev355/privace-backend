
const express = require('express')

const { handlePayment, handleBooking, handleContact } = require('./controller');

const router = express.Router()


// Route handler
app.post("/charge", handlePayment);


app.post("/booknow",handleBooking);


app.post("/contactus", handleContact)


module.exports = router
