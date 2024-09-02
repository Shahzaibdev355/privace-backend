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
       





        <!DOCTYPE html>
<html>
  <head>

   <style>
    body {
      margin: 0px;
      overflow-x: hidden;
    }

    .section {
      display: inline-block;
      width: 100%;
    }


    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }

    .bg-3 {
      background-color: #F0FBF7 !important;
    }

    .mt-20 {
      margin-top: 20px !important;
    }

    .mt-25 {
      margin-top: 25px !important;
    }

    .mt-30 {
      margin-top: 30px !important;
    }

    .mt-35 {
      margin-top: 35px !important;
    }

    .mt-40 {
      margin-top: 40px !important;
    }

    .mt-45 {
      margin-top: 45px !important;
    }

    .mt-50 {
      margin-top: 50px !important;
    }

    .mt-55 {
      margin-top: 55px !important;
    }

    .mt-60 {
      margin-top: 60px !important;
    }

    .mt-65 {
      margin-top: 65px !important;
    }

    .mt-70 {
      margin-top: 70px !important;
    }

    .mt-75 {
      margin-top: 75px !important;
    }

    .mt-80 {
      margin-top: 80px !important;
    }

    .mt-85 {
      margin-top: 85px !important;
    }

    .mt-90 {
      margin-top: 90px !important;
    }

    .mt-95 {
      margin-top: 95px !important;
    }

    .mt-100 {
      margin-top: 100px !important;
    }

    .mt-105 {
      margin-top: 105px !important;
    }

    .mt-110 {
      margin-top: 110px !important;
    }

    .mt-115 {
      margin-top: 115px !important;
    }

    .mt-120 {
      margin-top: 120px !important;
    }

    .mt-125 {
      margin-top: 125px !important;
    }

    .mt-130 {
      margin-top: 130px !important;
    }

    .mt-135 {
      margin-top: 135px !important;
    }

    .mt-140 {
      margin-top: 140px !important;
    }

    .mt-145 {
      margin-top: 145px !important;
    }

    .mt-150 {
      margin-top: 150px !important;
    }

    .mt-155 {
      margin-top: 155px !important;
    }

    .mt-160 {
      margin-top: 160px !important;
    }

    .mt-165 {
      margin-top: 165px !important;
    }

    .mt-170 {
      margin-top: 170px !important;
    }

    .mt-175 {
      margin-top: 175px !important;
    }

    .mt-180 {
      margin-top: 180px !important;
    }

    .mt-185 {
      margin-top: 185px !important;
    }

    .mt-190 {
      margin-top: 190px !important;
    }

    .mt-195 {
      margin-top: 195px !important;
    }

    .mt-200 {
      margin-top: 200px !important;
    }

    .mb-5 {
      margin-bottom: 5px !important;
    }

    .mb-10 {
      margin-bottom: 10px !important;
    }

    .mb-15 {
      margin-bottom: 15px !important;
    }

    .mb-20 {
      margin-bottom: 20px !important;
    }

    .mb-25 {
      margin-bottom: 25px !important;
    }

    .mb-30 {
      margin-bottom: 30px !important;
    }

    .mb-35 {
      margin-bottom: 35px !important;
    }

    .mb-40 {
      margin-bottom: 40px !important;
    }

    .mb-45 {
      margin-bottom: 45px !important;
    }

    .mb-50 {
      margin-bottom: 50px !important;
    }

    .mb-55 {
      margin-bottom: 55px !important;
    }

    .mb-60 {
      margin-bottom: 60px !important;
    }

    .mb-65 {
      margin-bottom: 65px !important;
    }

    .mb-70 {
      margin-bottom: 70px !important;
    }

    .mb-75 {
      margin-bottom: 75px !important;
    }

    .mb-80 {
      margin-bottom: 80px !important;
    }

    .mb-85 {
      margin-bottom: 85px !important;
    }

    .mb-90 {
      margin-bottom: 90px !important;
    }

    .mb-95 {
      margin-bottom: 95px !important;
    }

    .mb-100 {
      margin-bottom: 100px !important;
    }

    .mb-105 {
      margin-bottom: 105px !important;
    }

    .img-responsive {
      max-width: 100%;
    }

    body {
      font-family: "DM Sans", sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "DM Sans", sans-serif;
      font-style: normal;
      color: #000000;
    }

    
    .heading-52 {
      font-weight: 400;
      font-size: 52px;
      line-height: 76px;
    }

    .heading-52-medium {
      font-weight: 500;
      font-size: 52px;
      line-height: 76px;
    }

    .heading-52-bold {
      font-weight: 700;
      font-size: 52px;
      line-height: 76px;
    }

    .heading-44 {
      font-weight: 400;
      font-size: 44px;
      line-height: 58px;
    }

    .heading-44-medium {
      font-weight: 500;
      font-size: 44px;
      line-height: 58px;
    }

    .heading-44-bold {
      font-weight: 700;
      font-size: 44px;
      line-height: 58px;
    }

    .heading-100-medium {
      font-weight: 700;
      font-size: 100px;
      line-height: 130px;
    }

    .heading-36-medium {
      font-weight: 500;
      font-size: 36px;
      line-height: 58px;
    }

    .heading-32-medium {
      font-weight: 500 !important;
      font-size: 32px !important;
      line-height: 58px !important;
    }

    .heading-30-medium {
      font-weight: 500;
      font-size: 30px;
      line-height: 58px;
    }

    .heading-24 {
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
    }

    .heading-24-medium {
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    .heading-24-bold {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
    }

    .bg-white {
      background-color: #ffffff;
    }

    .color-grey {
      color: #626262;
    }

    .color-primary {
      color: #000000;
    }

    .color-text {
      color: #181A1F !important;
    }

    .bg-primary {
      background-color: #000000 !important;
    }

    .bg-secondary {
      background-color: #E95440 !important;
    }

    .text-14 {
      font-size: 14px !important;
      line-height: 24px !important;
      font-weight: 400 !important;
    }

    .text-14-medium {
      font-size: 14px !important;
      line-height: 24px !important;
      font-weight: 500 !important;
    }

    .text-14-bold {
      font-size: 14px;
      line-height: 24px;
      font-weight: 700;
    }

    .text-16 {
      font-size: 16px !important;
      line-height: 28px !important;
      font-weight: 400 !important;
    }

    .text-16-medium {
      font-size: 16px;
      line-height: 28px;
      font-weight: 500;
    }

    .text-16-bold {
      font-size: 16px;
      line-height: 28px;
      font-weight: 700;
    }

    .text-18 {
      font-size: 18px;
      line-height: 28px;
      font-weight: 400;
    }

    .text-18-medium {
      font-size: 18px;
      line-height: 28px;
      font-weight: 500;
    }

    .text-18-medium-2 {
      font-size: 18px;
      line-height: 35px;
      font-weight: 500;
    }

    .text-18-bold {
      font-size: 18px;
      line-height: 28px;
      font-weight: 700;
    }

    .text-20 {
      font-size: 20px;
      line-height: 32px;
      font-weight: 400;
    }

    .text-20-medium {
      font-size: 20px;
      line-height: 32px;
      font-weight: 500;
    }

    .text-20-bold {
      font-size: 20px;
      line-height: 32px;
      font-weight: 700;
    }

    .box-invoice-block {
      padding: 0px 20px;
    }

    .box-invoice {
      background-color: #ffffff;
      box-shadow: 0px 0px 35px rgba(181, 181, 195, 0.15);
      border-radius: 6px;
      position: relative;
      max-width: 1170px;
      margin: auto;
      margin-top: 70px;
      margin-bottom: 70px;
    }

    .inner-invoice {
      padding: 60px 100px 0px 100px;
    }

    .invoice-top {
      margin: 0px -10px;
    }

    .invoice-left {
      width: 100%;
      padding: 0px 10px;
    }

    .invoice-right {
      width: 100%;
      padding: 0px 10px;
      max-width: 350px;
    }

    .bottom-invoice {
      padding: 48px 0px 44px 0px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      border-top: 1px solid #E5E5E5;
      margin-top: 100px;
    }

    .bottom-invoice a {
      display: inline-block;
      padding: 0px 30px;
    }

    .table-invoice thead th {
      background-color: #F0FBF7;
      padding: 21px 41px;
      font-size: 18px;
      line-height: 28px;
      font-weight: 500;
    }

    .table-invoice tbody tr td {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #181A1F;
      padding: 23px 41px;
      border-bottom: 1px solid #E5E5E5;
    }

    .table-invoice tbody tr:last-child td {
      border-bottom: 0px;
    }

    .box-booking-tabs {
      display: flex;
      margin: 0px -15px;
    }

    .box-booking-tabs .item-tab {
      width: 25%;
      padding: 0px 15px;
    }

    .box-booking-tabs .item-tab .box-tab-step {
      width: 100%;
      padding: 30px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #E5E5E5;
      cursor: pointer;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab {
      display: flex;
      align-items: center;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .icon-book {
      display: inline-block;
      height: 60px;
      width: 60px;
      margin-right: 20px;
      background-color: #F0FBF7;
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .icon-book.icon-vehicle {
      background-image: url(../imgs/page/booking/vehicle.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .icon-book.icon-extra {
      background-image: url(../imgs/page/booking/extra.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .icon-book.icon-pax {
      background-image: url(../imgs/page/booking/pax.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .icon-book.icon-payment {
      background-image: url(../imgs/page/booking/payment.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step .icon-tab .text-tab {
      font-size: 18px;
      line-height: 28px;
      color: #181A1F;
      font-weight: 500;
    }

    .box-booking-tabs .item-tab .box-tab-step.active,
    .box-booking-tabs .item-tab .box-tab-step:hover {
      border-bottom-color: #181A1F;
    }

    .box-booking-tabs .item-tab .box-tab-step.active .icon-tab .icon-book,
    .box-booking-tabs .item-tab .box-tab-step:hover .icon-tab .icon-book {
      background-color: #181A1F;
    }

    .box-booking-tabs .item-tab .box-tab-step.active .icon-tab .icon-book.icon-vehicle,
    .box-booking-tabs .item-tab .box-tab-step:hover .icon-tab .icon-book.icon-vehicle {
      background-image: url(../imgs/page/booking/vehicle-hover.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step.active .icon-tab .icon-book.icon-extra,
    .box-booking-tabs .item-tab .box-tab-step:hover .icon-tab .icon-book.icon-extra {
      background-image: url(../imgs/page/booking/extra-hover.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step.active .icon-tab .icon-book.icon-pax,
    .box-booking-tabs .item-tab .box-tab-step:hover .icon-tab .icon-book.icon-pax {
      background-image: url(../imgs/page/booking/pax-hover.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step.active .icon-tab .icon-book.icon-payment,
    .box-booking-tabs .item-tab .box-tab-step:hover .icon-tab .icon-book.icon-payment {
      background-image: url(../imgs/page/booking/payment-hover.svg);
      background-position: center;
      background-repeat: no-repeat;
    }

    .box-booking-tabs .item-tab .box-tab-step .number-tab span {
      font-weight: 500;
      font-size: 30px;
      line-height: 58px;
      color: #181A1F;
    }

    .box-row-tab {
      display: flex;
      flex-wrap: wrap;
      margin: 0px -10px;
    }

    .box-row-tab .box-tab-left {
      padding: 0px 10px;
      width: 71%;
    }

    .box-row-tab .box-tab-right {
      padding: 0px 10px;
      width: 29%;
    }


    .d-flex {
      display: flex !important;
    }

    .justify-content-between {
      justify-content: space-between !important;
    }
  </style>
    
  </head>
  <body>
   
   
    <main class="main">



      <section class="section bg-3 box-invoice-block">
        <div class="box-invoice"> 
          <div class="inner-invoice"> 
            <div class="d-flex invoice-top"> 
              <div class="invoice-left"> 
                <div class="mb-40"><img class="mb-65" src="assets/imgs/privace-logo.jpeg" alt="Privace" style="width: 35%; border-radius: 10px;">
                  <p class="text-grey text-14">Payment date:</p>
                  <p class="text-16-medium color-text">${new Date().toLocaleDateString()}</p>
                </div>
                <div class="d-flex justify-content-between mb-30"> 
                  <h3 class="heading-24-medium color-text">Booking Reference Number #</h3><span class="text-16-medium color-text">${
                    formData.bookrefno
                  }</span>
                </div>
                <div class="d-flex justify-content-between mb-20"> 
                  <h5 class="text-18-medium color-text mb-15">Name</h5>
                  <h6 class="text-16-medium color-text mb-5">${
                    formData.fullname
                  } ${formData.lastname}</h6>
                </div>
                <div class="d-flex justify-content-between mb-20"> 
                  <h5 class="text-18-medium color-text mb-15">Email</h5>
                  <h6 class="text-16-medium color-text mb-5">${
                    formData.email
                  }</h6>
                </div>
                <div class="d-flex justify-content-between mb-20"> 
                  <h5 class="text-18-medium color-text mb-15">Phone No.</h5>
                  <h6 class="text-16-medium color-text mb-5"> ${
                    formData.country_code
                  } ${formData.phone}</h6>
                </div>
                <div class="d-flex justify-content-between mb-20"> 
                  <h5 class="text-18-medium color-text mb-15">Billing Address</h5>
                  <h6 class="text-16-medium color-text mb-5">${
                    formData.address
                  }, ${formData.city} - ${formData.zipcode} - ${
      formData.country
    }</h6>
                </div>
                <div class="d-flex justify-content-between mb-30" style="background-color: #F0FBF7; padding: 20px;"> 
                  <h2 class="text-18-medium color-text mb-">Total Payment</h2>
                  <h6 class="text-16-medium color-text mb-"><span class="text-18-medium color-text">(S$) ${amount} </span></h6>
                </div>
              </div>
              
            </div>
          

            <div class="bottom-invoice"> <a href="www.luxride.com">www.abc.com</a><a href="mailto:invoice@luxride.com">ask@privacelimo.com</a><a href="tel:+6588573797">+65 8857 3797</a></div>
          </div>
        </div>
      </section>










    </main>
    
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
