const app = require('express')();
const cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

app.use(cors({ origin: '*' }));

const port = process.env.PORT || 5000

// const stripe = require("stripe")("sk_test_51ImJmKCcyEvdPPThBM5L3zCkGz3QcOfpuL2WhI9EmpWT307M0CLkksCAzMobGCtHken40UFBOLHKhMzTi2Qsqvl900dgO9Ekrb");
// const uuid = require("uuidv4");

mongoose.Promise = global.Promise;

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
}).on('error', function(err) { console.log('Error', err) })
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(app.json());

app.get('/', function(req, res) {
    res.send("Welcome to API!");
});



let v1 = require('./routes');



app.use('/', v1.router);

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// payment gateway: stripe
// app.get("/payment", (req, res) => {
//     res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
// });

// app.post("/checkout", async(req, res) => {
//     console.log("Request:", req.body);

//     let error;
//     let status;
//     try {
//         const { token, bookingDetails } = req.body;

//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         const idempotency_key = uuid();
//         const charge = await stripe.charges.create({
//             amount: bookingDetails.price * 100,
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchased the ${bookingDetails.hotel_name}`,
//             // shipping: {
//             //     name: token.card.name,
//             //     address: {
//             //         line1: token.card.address_line1,
//             //         line2: token.card.address_line2,
//             //         city: token.card.address_city,
//             //         country: token.card.address_country,
//             //         postal_code: token.card.address_zip
//             //     }
//             // }
//         }, {
//             idempotency_key
//         });
//         console.log("Charge:", { charge });
//         status = "success";
//     } catch (error) {
//         console.error("Error:", error);
//         status = "failure";
//     }

//     res.json({ error, status });
// });


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

// module.exports = app