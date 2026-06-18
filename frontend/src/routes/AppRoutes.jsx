import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage
  from "../pages/LoginPage";

import DashboardPage
  from "../pages/DashboardPage";

import ProtectedRoute
  from "./ProtectedRoute";

import SchemesPage
  from "../pages/SchemesPage";

import ApplicationsPage
  from "../pages/ApplicationsPage";

import ProfilePage
  from "../pages/ProfilePage";


import SchemeDetailsPage
  from "../pages/SchemeDetailsPage";

import ApplicationTrackerPage
  from "../pages/ApplicationTrackerPage";

import MyApplicationsPage
  from "../pages/MyApplicationsPage";

import AdminDashboardPage
  from "../pages/AdminDashboardPage";

import AdminRoute
  from "./AdminRoute";

import DashboardLayout
from "../components/layout/DashboardLayout";

import AdminSchemesPage
from "../pages/AdminSchemesPage";

import AdminApplicationsPage
from "../pages/AdminApplicationsPage";

import AdminAgenciesPage
from "../pages/AdminAgenciesPage";

import AdminAgentsPage
from "../pages/AdminAgentsPage";

import CompleteProfilePage
from "../pages/CompleteProfilePage";

import AgentDashboardPage
from "../pages/agent/AgentDashboardPage";

import AgencyDashboardPage
from "../pages/agency/AgencyDashboardPage";

import AdminApplicationDocumentsPage
from "../pages/AdminApplicationDocumentsPage";

import AdminSchemeSourcesPage
from "../pages/AdminSchemeSourcesPage";

import AdminSourceConfigPage
from "../pages/AdminSourceConfigPage";

import AdminImportMonitoringPage
from "../pages/AdminImportMonitoringPage";

import AgencyApplicationsPage
from "../pages/agency/AgencyApplicationsPage";

import AgentApplications
from "../pages/agent/AgentApplications";

import AgentApplicationDetails
from "../pages/agent/AgentApplicationDetails";

import AdminGovernmentQueuePage
from "../pages/admin/AdminGovernmentQueuePage";

import AdminUsersPage
from "../pages/admin/AdminUsersPage";


import AdminUserDetailPage
from "../pages/admin/AdminUserDetailPage";





function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Schemes */}
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SchemesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

    

        {/* Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MyApplicationsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Scheme Details */}
        <Route
          path="/schemes/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SchemeDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Application Tracker */}
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ApplicationTrackerPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* My Applications */}
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MyApplicationsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboardPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/schemes"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminSchemesPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminApplicationsPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/agencies"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminAgenciesPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/agents"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminAgentsPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/complete-profile"
          element={
            <CompleteProfilePage />
          }
        />

        <Route

          path="/agent/dashboard"

          element={
            <AgentDashboardPage />
          }
        />


        <Route

          path="/agency/dashboard"

          element={
            <AgencyDashboardPage />
          }
        />

         <Route
          path="/admin/applications/:id/documents"
          element={
            <AdminApplicationDocumentsPage />
          }
        />

        <Route
          path="/admin/scheme-sources"
          element={
            <AdminSchemeSourcesPage />
          }
        />

        <Route
          path="/admin/source-config"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminSourceConfigPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/import-monitoring"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminImportMonitoringPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/agency/applications"
          element={
            <AgencyApplicationsPage />
          }
        />

        <Route
          path="/agent/applications"
          element={<AgentApplications />}
        />

        <Route
          path="/agent/applications/:id"
          element={
            <AgentApplicationDetails />
          }
        />

        <Route
          path="/admin/government-queue"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminGovernmentQueuePage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={<AdminUsersPage />}
        />

        <Route
          path="/admin/users/:id"
          element={
            <AdminUserDetailPage />
          }
        />

 



      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;