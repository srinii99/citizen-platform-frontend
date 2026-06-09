import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  application_id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: {
    type: String,
    enum: ["SERVICE_FEE"],
    default: "SERVICE_FEE"
  },
  status: {
    type: String,
    default: "PENDING"
  },
  created_at: { type: Date, default: Date.now }
});

export const Payment = mongoose.model("Payment", paymentSchema);