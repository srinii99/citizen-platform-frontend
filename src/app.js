import "dotenv/config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";
import schemeRoutes from "./modules/scheme/scheme.routes.js";
import applicationRoutes from "./modules/application/application.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";
import affidavitRoutes from "./modules/affidavit/affidavit.routes.js";
import templateRoutes from "./modules/affidavit/template.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import adminRoutes
from "./modules/admin/admin.routes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/schemes", schemeRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/affidavit", affidavitRoutes);

app.use("/api/templates", templateRoutes);
app.use("/uploads", express.static("uploads"));

app.use(
  "/api/admin",
  adminRoutes);
app.use(errorMiddleware);


// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});