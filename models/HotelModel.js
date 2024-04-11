let mongoose = require('mongoose')

let Schema = mongoose.Schema

let HotelModelSchema = new Schema({
    hotelOwner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelOwner',
        required: [true, 'HotelOwner id is required!']
    },
    city: {
        type: String,
        required: true
    },
    hotel_name: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    rooms_available: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    }

})

// Hotel is the collection name 
const Hotel = mongoose.model('Hotel', HotelModelSchema)

module.exports = { Hotel }