const nodemailer = require("nodemailer");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51PtRoxRqsLaTotiTU6ykhRnVLDGA2FL2aDFxUeJ6lpcF6qjMccXEJPOOPbIODBzM05gkgaBALvA9NwNB6N8IKCsR00iLzJ61YV"
);
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.json({ message: "backend is running" });
});

app.post("/charge", async (req, res) => {
  const { token, amount, formData } = req.body;

  try {
    const customer = await stripe.customers.create({
      name: `${formData.fullname} ${formData.lastname}`,
      email: formData.email,
      source: token, // Add the token here if you want to link it to the customer
    });

    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      customer: customer.id, // Link the charge to the customer
      description: `Paid By ${formData.fullname} ${formData.lastname}`,
      receipt_email: formData.email,

      metadata: {
        Address: `
        ${formData.address},
        ${formData.city} -
        ${formData.zipcode} - 
        ${formData.country}
      `,

        Booking_reference_number: formData.bookrefno,
        Name: `${formData.fullname} ${formData.lastname}`,
        Email: formData.email,
        // Phone: formData.phone,
        Phone: `${formData.country_code} ${formData.phone}`,
      },
    });

    const receiptUrl = charge.receipt_url;

    // Generate a custom receipt (HTML, PDF, etc.)
    const receiptHtml = `
        <h1>Thank you for your payment!</h1>
        <p>Booking Reference: ${formData.bookrefno}</p>
        <p>Name: ${formData.fullname} ${formData.lastname}</p>
        <p>Email: ${formData.email}</p>
        <p>Phone: ${formData.country_code} ${formData.phone}</p>
        <p>Amount Paid: $${amount}</p>
        <p>Address: ${formData.address}, ${formData.city} - ${formData.zipcode} - ${formData.country}</p>
        <p>You can view your official receipt here: <a href="${receiptUrl}">View Receipt</a></p>
      `;

    // Send the receipt via email
    // let transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "shahzaibsheikh366@gmail.com", // Replace with your email
    //     pass: "zjhr yeuh akum pthu", // Replace with your email password or app-specific password
    //   },
    //   logger: true, // Enable logging
    //   debug: true, // Enable debug output
    // });

    // Send the receipt via email
    let transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net", // Replace with your domain's SMTP server
        port: 465, // You can use 465 for SSL or 587 for TLS
        secure: true, // Use true for 465, false for other ports
        auth: {
          user: "ask@privacelimo.com", // Replace with your domain email
          pass: "Privace-3797", // Replace with your email password
        },
        logger: true, // Enable logging
        debug: true, // Enable debug output
      });

    // const mailOptions = {
    //   from: "shahzaibsheikh366@gmail.com",
    //   to: formData.email,
    //   subject: "Your Payment Receipt",
    //   html: receiptHtml, // You can also use 'text' for plain text emails
    // };



    // The following line must be inside an async function
    const info = await transporter.sendMail({
      from: "ask@privacelimo.com",
      to: formData.email,
      subject: "Your Payment Receipt",
      html: receiptHtml,
    });



    console.log("Receipt sent: " + info.response);

    res.json({ success: true, charge });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

// module.exports = app;
