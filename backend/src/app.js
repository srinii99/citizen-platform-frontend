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
import dashboardRoutes
from "./modules/dashboard/dashboard.routes.js";
import userRoutes
from "./modules/user/user.routes.js";
import agencyRoutes
from "./modules/agencies/agency.routes.js";
import agentRoutes
from "./modules/agents/agent.routes.js";

import familyRoutes
from "./modules/family/familyMember.routes.js";

import documentRoutes
from "./modules/document/document.routes.js";

import whatsappRoutes
from "./modules/whatsapp/whatsapp.routes.js";

import schemeImportRoutes
from "./modules/scheme-import/schemeImport.routes.js";

import {
  startImportScheduler,
} from "./jobs/importScheduler.js";

import {
  seedSources,
} from "./modules/source-config/sourceConfig.service.js";

import sourceConfigRoutes
from "./modules/source-config/sourceConfig.routes.js";


import transformRoutes
  from "./modules/scheme-import/routes/transform.routes.js";


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
  "/api/users",
  userRoutes
);

app.use(
  "/api/agencies",
  agencyRoutes
);

app.use(
  "/api/agents",
  agentRoutes
);
app.use(
  "/api/admin",
  adminRoutes);
app.use(errorMiddleware);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/family",
  familyRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/whatsapp",
  whatsappRoutes
);

app.use(
  "/api/admin/scheme-import",
  schemeImportRoutes
);

app.use(
  "/api/admin/source-config",
  sourceConfigRoutes
);

app.use(
  "/source-config",
  sourceConfigRoutes
);

app.use(
  "/admin/transform",
  transformRoutes
);


const startServer =
  async () => {

    await connectDB();

    await seedSources();

    startImportScheduler();

    console.log(
      "Source Config Seeded"
    );
};

startServer();

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});