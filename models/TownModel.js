let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TownModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});

const Town = mongoose.model('Town', TownModelSchema);
module.exports = { Town };