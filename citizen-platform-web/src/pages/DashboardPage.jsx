import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/AuthContext";

function DashboardPage() {

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();

    window.location.href = "/";
  };

  return (

    <DashboardLayout>

      <h1>Dashboard</h1>

      <p>
        Welcome to Citizen Platform 🚀
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </DashboardLayout>
  );
}

export default DashboardPage;