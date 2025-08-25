// models/booking.js

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
    phone: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    specialNotes: {
      type: String,
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // This connects the booking to the Service model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
