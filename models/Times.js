const mongoose = require("mongoose");

const TimeSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
    },
    date: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    projectId: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Time = mongoose.model("Times", TimeSchema);

module.exports = Time;
