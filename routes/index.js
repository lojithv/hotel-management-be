let express = require('express');
let router = express.Router();
const stripe = require("stripe")("sk_test_51ImJmKCcyEvdPPThBM5L3zCkGz3QcOfpuL2WhI9EmpWT307M0CLkksCAzMobGCtHken40UFBOLHKhMzTi2Qsqvl900dgO9Ekrb");
const uuid = require("uuidv4");

// let Town = require('../models/TownModel');

router.get('/api', function(req, res) {
    res.send("Welcome to API!");
});

// end point localhost:5000/
// router.route('/towns').get((req, res) => {
//     Town.find()
//         .then(towns => res.json(towns))
//         .catch(err => res.status(400).json('Error: ' + err))

// })


router.post("/checkout", async(req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { bookingDetails, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create({
            amount: bookingDetails.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${bookingDetails.hotel_name}`,
            // shipping: {
            //   name: token.card.name,
            //   address: {
            //     line1: token.card.address_line1,
            //     line2: token.card.address_line2,
            //     city: token.card.address_city,0
            //     country: token.card.address_country,
            //     postal_code: token.card.address_zip
            //   }
            // }
        }, {
            idempotency_key
        });
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});

require('./AuthRoutes')(router);
require('./CustomerRoutes')(router);
require('./HotelOwnerRoutes')(router);
require('./SystemAdminRoutes')(router);

module.exports.router = router