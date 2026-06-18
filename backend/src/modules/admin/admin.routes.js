import express from "express";

import {

  getAdminDashboardStats,

} from "./admin.dashboard.controller.js";

import {

  getAllApplications,

  updateApplicationStatus,

} from "./admin.controller.js";

import {

  createScheme,

  updateScheme,

  deleteScheme,

  getAllSchemesAdmin,

} from "../scheme/scheme.controller.js";

import {

  getApplicationDocuments,

  verifyDocument,

} from "../application/application.controller.js";

import {

  authMiddleware,

} from "../../middleware/auth.middleware.js";

import {

  allowRoles,

} from "../../middleware/role.middleware.js";


import {
  getImportMonitoringSummary,
  getRecentImportJobs,
}
from "./importMonitoringController.js";

import {
  getUsers,
  getUserById,
} from "./adminUser.controller.js";




const router =
  express.Router();


// -----------------------------------
// ROLE ACCESS
// -----------------------------------

const ADMIN_ACCESS = [

  "ADMIN",

  "SUPER_ADMIN",

  "EXECUTIVE",
];




// -----------------------------------
// DASHBOARD
// -----------------------------------

router.get(

  "/dashboard",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  getAdminDashboardStats
);


// -----------------------------------
// APPLICATIONS
// -----------------------------------

router.get(

  "/applications",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  getAllApplications
);


router.put(

  "/applications/:id/status",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  updateApplicationStatus
);

// -----------------------------------
// APPLICATION DOCUMENTS
// -----------------------------------

router.get(

  "/applications/:id/documents",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  getApplicationDocuments
);


router.put(

  "/applications/:id/documents/:documentId",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  verifyDocument
);


// -----------------------------------
// SCHEMES
// -----------------------------------

router.get(

  "/schemes",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  getAllSchemesAdmin
);


router.post(

  "/schemes",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  createScheme
);


router.put(

  "/schemes/:id",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  updateScheme
);


router.delete(

  "/schemes/:id",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  deleteScheme
);

router.get(
  "/test",
  (req, res) => {

    res.json({
      success: true,
      message: "Admin route working"
    });

  }
);

router.get(
  "/import-monitoring",
  getImportMonitoringSummary
);

router.get(
  "/import-monitoring/history",
  getRecentImportJobs
);

// -----------------------------------
// USERS
// -----------------------------------

router.get(

  "/users",

  authMiddleware,

  allowRoles(
    ...ADMIN_ACCESS
  ),

  getUsers
);

router.get(
  "/users/:id",
  authMiddleware,
  allowRoles(
    ...ADMIN_ACCESS
  ),
  getUserById
);


export default router;