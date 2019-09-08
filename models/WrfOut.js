const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WrfOutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fullPath: {
    type: String,
    required: true
  },
  forecastDate: {
    y: {
      type: Number,
      required: true
    },
    m: {
      type: Number,
      required: true
    },
    d: {
      type: Number,
      required: true
    }
  },
  fileSize: {
    type: Number
  },
  modifiedTime: {
    type: String,
    required: true
  }
});

module.exports = WrfOut = mongoose.model("wrf_out_files", WrfOutSchema);
