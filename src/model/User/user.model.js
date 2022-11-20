const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('../plugins');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
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
userSchema.pre('save', (next) => {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }
      bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

const Device = mongoose.model('User', userSchema);
module.exports = Device;
