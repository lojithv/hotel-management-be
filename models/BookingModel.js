let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookingeModelSchema = new Schema({
    hotel_name: {
        type: String,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'User field is required!']
    },
    hotelOwner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelOwner',
        required: [true, 'HotelOwner id is required!']
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, 'Hotel id is required!']
    },
    checkin_date: {
        type: Date,
        required: true
    },
    checkout_date: {
        type: Date,
        required: true
    },
    people_count: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true
    }
});

const Booking = mongoose.model('Booking', BookingeModelSchema);
module.exports = { Booking };