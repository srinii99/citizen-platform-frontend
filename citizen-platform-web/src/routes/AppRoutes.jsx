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

import EligibleSchemesPage
  from "../pages/EligibleSchemesPage";

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
  from "../layouts/DashboardLayout";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
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

        {/* Eligible Schemes */}
        <Route
          path="/eligible-schemes"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EligibleSchemesPage />
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
                <ApplicationsPage />
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
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboardPage />
              </DashboardLayout>
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;