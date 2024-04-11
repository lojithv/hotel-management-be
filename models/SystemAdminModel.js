let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SystemAdminModelSchema = new Schema({
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

const SystemAdmin = mongoose.model('SystemAdmin', SystemAdminModelSchema);
module.exports = { SystemAdmin }