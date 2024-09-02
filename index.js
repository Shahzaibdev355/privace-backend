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

    // Generate a custom receipt (HTML)
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">

    <style>
        body {
            margin: 0px;
            padding: 0px;
           
        }


        .box-invoice-block{
            width: 100%;
            background-color: #F0FBF7 !important;
            font-family: "Roboto", sans-serif;
            font-weight: 300;
            font-style: normal;

            padding-top: 70px!important;
            padding-bottom: 70px!important;
        }


        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0px;
        }

        .box-invoice {
            background-color: #ffffff!important;
            box-shadow: 0px 0px 35px rgba(181, 181, 195, 0.15)!important;
            border-radius: 6px!important;
            position: relative;
            width: 70%!important;
            margin: auto!important;
           
        }

        .inner-invoice {
            padding: 60px 100px 20px 100px;

        }

        .privaceLogo {
            width: 35%!important;
            border-radius: 10px!important;
            margin: auto!important;
            margin-bottom: 30px!important;
        }

        .infoDate {
            display: flex;
            flex-direction: row;
            justify-content: space-between!important;
            margin-top: 30px;
            margin-bottom: 50px;
        }

        .informationDiv {
            display: flex!important;
            flex-direction: row!important;
            justify-content: space-between!important;

            margin-bottom: 30px!important;
        }

        .paymentDiv {
            display: flex;
            flex-direction: row;
            justify-content: space-between!important;
            background-color: #F0FBF7;
            padding: 20px;
            margin-bottom: 30px;
        }

        .bottomInvoice {
            margin-top: 70px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly!important;
        }


        .infoHeadingh3 {
            font-size: 16px;
        }

        .infoPara{
            font-size: 14px;
            font-weight: 500;
        }

        .infoHeadingh5 {
            font-size: 20px;
        }

        a {
            color: black;
            font-weight: 500;
            text-decoration: none;
        }

        @media (max-width: 768px) {
            .informationDiv {
                display: flex;
                flex-direction: column!important;
                justify-content: space-between;

                margin-bottom: 30px;
            }
        }
    </style>
      </head>
      <body>
         <section class="section bg-3 box-invoice-block">
        <div class="box-invoice">
            <div class="inner-invoice">
                <div class="d-flex invoice-top">
                    <div class="invoice-left">
                        <div class="" style="display: flex;">
                            <img class="mb-65 privaceLogo" src="assets/imgs/privaceLogo.jpeg" alt="Privace">

                        </div>
                        <div class="infoDate">
                            <p class="text-grey text-14">Invoice date:</p>
                            <p class="info-p">${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="heading-24-medium color-text">Booking Reference Number #</h3>
                            <p class="info-p">${formData.bookrefno}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3">Name:</h3>
                            <p class="infoParamb-5">${formData.fullname} ${formData.lastname}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3">Email:</h3>
                            <p class="infoParamb-5">${formData.email}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3">Phone No:</h3>
                            <p class="infoParamb-5">${formData.phone}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3">Billing Address:</h3>
                            <p ${ formData.address}, ${formData.city} - ${formData.zipcode} - ${formData.country}
                            </p>
                        </div>
                        <div class="paymentDiv" style="">
                            <h2 class="text-18-medium color-text mb-">Total Payment</h2>
                            
                                <h5 class="infoHeadingh5">${amount}</h5>
                        </div>
                    </div>

                </div>


                <div class="bottomInvoice"> <a href="www.luxride.com">www.abc.com</a><a
                        href="mailto:invoice@luxride.com">ask@privacelimo.com</a><a href="tel:+6588573797">+65 8857
                        3797</a></div>
            </div>
        </div>
    </section>

      </body>
      </html>
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
