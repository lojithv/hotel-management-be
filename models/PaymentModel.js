let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PaymentModelSchema = new Schema({
    service_record_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: [true, 'Service field is required!']
    },
    amount: {
        type: String,
        required: [true, 'Amount field is required!']
    },
    status: {
        type: String,
        enum: ['completed', 'pending'],
        default: 'pending'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', PaymentModelSchema);
module.exports = { Payment }