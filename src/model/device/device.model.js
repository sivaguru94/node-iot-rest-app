const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    room: {
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
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
