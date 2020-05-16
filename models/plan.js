const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  features: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: String,
  },
  support: [String],
});

module.exports = mongoose.model("Plan", planSchema);
