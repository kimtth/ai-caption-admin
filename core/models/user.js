const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true
  }, //email
  username: String,
  password: String,
  usertype: {
    type: String,
    enum : ['USER','ADMIN'],
    default: 'USER'
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10); //Kim: const saltRounds = 10;
  this.password = hash;
}

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password; //Kim: delete password in user.
  return data
}

UserSchema.methods.generateToken = function () {
  const token = jwt.sign({
    userId: this.userId,
  },
    process.env.JWT_SECRET, {
    expiresIn: '7d',
  },
  );
  return token;
};

UserSchema.statics.findByUserId = function (userId) {
  return this.findOne({
    userId
  });
};

module.exports = mongoose.model('User', UserSchema);
