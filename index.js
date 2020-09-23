const express = require("express")

const Insta = require("instamojo-nodejs")

const bodyParser = require("body-parser")

const API_KEY = "test_f08c712e84c3c976ce54fb796c5"

const AUTH_KEY = "test_0dc43f62945ed2e867f7ea768ce"

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile("first.html")
})

app.post('/pay',(req,res) => {

    var name = req.body.name
    var email = req.body.email
    var amount = req.body.amount
    console.log(name)
    console.log(email)
    console.log(amount)

    var data = new Insta.PaymentData();

    const REDIRECT_URL = "http://localhost:4000/success";

    data.setRedirectUrl(REDIRECT_URL);
    data.send_email = "True";
    data.purpose = "Donation to Kare Foundation"; // REQUIRED
    data.amount = amount;
    data.name = name;
    data.email = email; // REQUIRED

    Insta.createPayment(data, function (error, response) {
        if (error) {
          // some error
        } else {
          // Payment redirection link at response.payment_request.longurl
          console.log(response)
          res.send("Please check your email to make payment")
        }
    });
});

app.get('/success', (req,res) => {
    res.send("Payment was Successful please check your email for invoice and pdf")
})


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`)
});