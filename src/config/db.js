import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB error:", err);
    process.exit(1);
  }
};