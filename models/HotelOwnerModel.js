let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HotelOwnerModelSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const HotelOwner = mongoose.model('HotelOwner', HotelOwnerModelSchema);
module.exports = { HotelOwner };