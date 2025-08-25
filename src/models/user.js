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
    required: false, // Make optional for Google logins
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows documents without a googleId
  },
  profileImageUrl: {
    type: String,
  },
  accessToken: {
    type: String,
    required: false, // Access tokens can expire and be refreshed, so they are not always present
  },
  refreshToken: {
    type: String,
  },
});

// Hash password before saving (only if a password exists)
UserSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
