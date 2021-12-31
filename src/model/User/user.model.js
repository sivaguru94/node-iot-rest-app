const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const Device = mongoose.model('User', userSchema);
module.exports = Device;
