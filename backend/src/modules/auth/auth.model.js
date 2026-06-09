import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true
  },

  otp: String,

  otp_expiry: Date,

  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model("User", userSchema);