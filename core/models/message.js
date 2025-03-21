const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  id: { type:String, unique: true },
  channelId: String,
  userId: String,
  conversationText: String,
  translateText: String,
  type: Number, //1.firstTab 2.secondTab
  timestamp: String,
  metadata: String, //{from:en, to:jp}
  isAudioRecord: Boolean,
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);