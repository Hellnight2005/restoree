// models/service.js

import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  // Add the new description field here
  description: {
    type: String,
    required: false, // Make this optional
  },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
export default Service;
