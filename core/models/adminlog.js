const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  id: { type: String, unique: true },
  type: {
    type: String,
    enum: ['Log', 'Custom'],
    default: 'Custom',
    required: true
  }, // 1.Log 2.Custom
  refValue: String,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AdminLog', adminSchema);
