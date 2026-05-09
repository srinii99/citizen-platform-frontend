import {
  Link,
  useNavigate
} from "react-router-dom";

function DashboardLayout({ children }) {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");
    };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh"
      }}
    >

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px"
        }}
      >

        <h2>Citizen Platform</h2>

        <hr />

        <Link
          to="/dashboard"
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px"
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/schemes"
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px"
          }}
        >
          Schemes
        </Link>

        <Link
          to="/applications"
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px"
          }}
        >
          Applications
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            display: "block",
            marginBottom: "10px"
          }}
        >
          Profile
        </Link>

        {user?.role === "ADMIN" && (

          <Link
            to="/admin"
            style={{
              color: "white",
              display: "block",
              marginBottom: "10px"
            }}
          >
            Admin Dashboard
          </Link>

        )}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          background: "#f8fafc"
        }}
      >

        {/* Top Navbar */}
        <div
          style={{
            background: "white",
            padding: "15px",
            borderBottom: "1px solid #ddd"
          }}
        >
          Welcome User 👋
        </div>

        {/* Page Content */}
        <div
          style={{
            padding: "20px"
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;