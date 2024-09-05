// const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



const { handlePayment, handleBooking, handleContact } = require('./controller');



// const { v4: uuidv4 } = require("uuid"); 

// const admin = require("firebase-admin");
// const path = require("path");

// // Initialize Firebase
// const serviceAccount = require(path.join(__dirname, process.env.FIRBASE_APPLICATION_CREDENTIALS));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:  process.env.FIREBASE_DATABASE_URL,
// });

// const db = admin.firestore();






const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000; // Use the port from .env, default to 3000 if not set

app.use(cors());
app.use(bodyParser.json());




app.get("/", async (req, res) => {
  res.json({ message: "backend is running" });
});






// Route handler
app.post("/charge", handlePayment);



app.post("/booknow",handleBooking);



app.post("/contactus", handleContact)






app.listen(port, () => console.log("Server running on port 3000"));

