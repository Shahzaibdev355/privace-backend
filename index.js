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
      currency: "sgd",
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

     <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">
    
    <style>
        body, table, td, a {
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            font-weight: 300;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #000000;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        table {
            border-collapse: collapse !important;
        }

        .box-invoice-block {
            width: 100%;
            background-color: #F0FBF7;
            padding-top: 70px;
            padding-bottom: 70px;
        }

        .box-invoice {
            background-color: #ffffff;
            border-radius: 6px;
            width: 70%;
            margin: auto;
            box-shadow: 0px 0px 35px rgba(181, 181, 195, 0.15);
        }

        .inner-invoice {
            padding: 60px 30px 20px 30px;
        }

        .privaceLogo {
            width: 100%;
            max-width: 150px;
            border-radius: 10px;
            display: block;
            margin: auto;
            margin-bottom: 30px;
        }

        .infoDate, .informationDiv, .paymentDiv {
            margin-bottom: 30px;
        }

        .infoHeadingh3 {
            font-size: 16px;
            margin: 0;
        }

        .infoPara {
            font-size: 14px;
            font-weight: 500;
            margin: 0;
        }

        .infoHeadingh5 {
            font-size: 22px;
            margin: 0;

        }

        .paymentDiv {
            background-color: #F0FBF7;
            padding: 20px;
        }

        .bottomInvoice {
            margin-top: 50px;
            text-align: center;
        }

        a {
            color: black;
            text-decoration: none;
            font-weight: 500;
            margin: 0 10px;
        }

        .ii a[href] {
    color: black!important;
     font-size: 18px;
}

        @media only screen and (max-width: 600px) {
            .box-invoice {
                width: 90%;
            }

            .inner-invoice {
                padding: 30px 15px 10px 15px;
            }

            .infoDate, .informationDiv, .paymentDiv {
                margin-bottom: 20px;
            }

            .infoHeadingh3 {
                font-size: 14px;
            }

            .infoPara {
                font-size: 12px;
            }

            .bottomInvoice {
                font-size: 12px;
            }
        }
    </style>
</head>

<body>
    <div class="box-invoice-block">
        <div class="box-invoice">
            <div class="inner-invoice">
                <img class="privaceLogo" style:"max-width: 250px;" src="https://privace-limousine.vercel.app/assets/imgs/privace-logo.jpeg" alt="Privace">
                 <div class="infoDate">
                            <h3 class="infoHeadingh3" style="font-size: 20px; margin-bottom: 0px;">Invoice date:</h3>
     <p class="infoPara" style="font-size: 18px;"> ${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="" style="font-size: 20px; margin-bottom: 0px;">Booking Reference Number #</h3>
                            <p class="infoPara" style="font-size: 18px; margin-bottom: 0px;">${formData.bookrefno}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3" style="font-size: 20px; margin-bottom: 0px;">Name:</h3>
                            <p class="infoPara mb-5"style="font-size: 18px; margin-bottom: 0px;">${formData.fullname} ${formData.lastname}</p>
                        </div>
                        <div class="informationDiv">
                            <h3 class="infoHeadingh3" style="font-size: 20px; margin-bottom: 0px;">Email:</h3>
                            <p class="infoPara mb-5" style="font-size: 18px; margin-bottom: 0px;">${formData.email}</p>
                        </div>
                         <div class="informationDiv">
                            <h3 class="infoHeadingh3" style="font-size: 20px; margin-bottom: 0px;">Phone No:</h3>
                            <p class="infoPara mb-5" style="font-size: 18px; margin-bottom: 0px;">${formData.country_code} ${formData.phone}</p>
                        </div>
                        <div class="informationDiv" >
                            <h3 class="infoHeadingh3" style="font-size: 20px; margin-bottom: 0px;">Billing Address:</h3>
                            <p style="font-size: 18px; margin-bottom: 0px;"> ${ formData.address}, ${formData.city} - ${formData.zipcode} - ${formData.country}</p>
                        </div>
                        <div class="paymentDiv" style="">
                            <h2 class="text-18-medium color-text mb-" style="font-size: 26px; margin-bottom: 10px;">Total Payment:</h2>
                            
                                <h5 class="infoHeadingh5"> (S$): ${amount}</h5>
                        </div>
               
                <div class="bottomInvoice">
                    <a href="https://www.abc.com">www.abc.com</a> | 
                    <a href="mailto:ask@privacelimo.com">ask@privacelimo.com</a> | 
                    <a href="tel:+6588573797">+65 8857 3797</a>
                </div>
            </div>
        </div>
    </div>
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

     const info2 = await transporter.sendMail({
      from: "ask@privacelimo.com",
      to: "shahzaibsheikh366@gmail.com",
      subject: "New Payment Received", // Different subject for internal notification
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
