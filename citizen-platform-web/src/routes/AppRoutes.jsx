import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import DashboardPage from "../pages/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import SchemesPage from "../pages/SchemesPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import ProfilePage from "../pages/ProfilePage";
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
import Navbar
from "../components/Navbar";

function AppRoutes() {

  return (
    <BrowserRouter>


      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <SchemesPage />
            </ProtectedRoute>
           }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eligible-schemes"
          element={
            <ProtectedRoute>
              <EligibleSchemesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schemes/:id"
          element={
            <ProtectedRoute>
              <SchemeDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationTrackerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;