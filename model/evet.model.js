const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ["Offline", "Online"],
    required: true
  },
  photos: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  speakers: {
    type: [String],
    required: true
  },
  tags: {
    type: [String],
    enum: ["Development", "Frontend", "Backend", "AL", "Mobile Dev"],
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  }
}, { timestamps: true });

const Event = mongoose.model("Event", modelSchema);
module.exports = Event;
