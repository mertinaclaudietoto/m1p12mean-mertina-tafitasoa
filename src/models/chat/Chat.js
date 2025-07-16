const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Emp' },
  content: String,
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }  ,
  islastMessage: { type: Boolean, default: true },
});
module.exports = mongoose.model('Message', messageSchema);
