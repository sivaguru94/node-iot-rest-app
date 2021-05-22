const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    isDeviceOn: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);


const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

