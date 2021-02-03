const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
  id: { type: String },
  name: String,
  userId: String,
  owner: Boolean,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Channel', channelSchema);