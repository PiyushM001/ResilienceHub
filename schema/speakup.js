const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const SpeakupSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

module.exports = mongoose.model("Speakup", SpeakupSchema);
