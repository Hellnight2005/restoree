// models/user.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  profileImageUrl: {
    type: String,
  },
  accessToken: {
    type: String,
    required: false,
  },
  refreshToken: {
    type: String,
  },
  // Add the new role field here
  role: {
    type: String,
    enum: ["user", "admin"], // Defines the possible values for the role
    default: "user", // Sets a default role for new users
    required: true,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
