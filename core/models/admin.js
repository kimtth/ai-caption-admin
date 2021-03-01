const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  id: { type: String, unique: true },
  type: { type: String, required: true },
  refId: { type: String, required: true },
  value: { type: String, required: true },
  stream: { type: String }, //Kim: base64 encoding
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
