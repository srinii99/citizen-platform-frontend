import {
  Navigate,
} from "react-router-dom";

const AdminRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // Not logged in
  if (!token) {

    return (
      <Navigate to="/login" />
    );
  }

  // Not admin
  if (
    user?.role !== "ADMIN"
  ) {

    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default AdminRoute;