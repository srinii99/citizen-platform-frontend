import {
  Link,
} from "react-router-dom";

const Navbar = () => {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  return (

    <nav className="bg-white shadow px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Citizen Platform
        </Link>

        <div className="flex gap-6 items-center">

          <Link
            to="/eligible-schemes"
            className="text-gray-700 hover:text-blue-600"
          >
            Schemes
          </Link>

          <Link
            to="/my-applications"
            className="text-gray-700 hover:text-blue-600"
          >
            My Applications
          </Link>

          {user?.role === "ADMIN" && (

            <Link
              to="/admin"
              className="text-blue-600 font-medium"
            >
              Admin Dashboard
            </Link>

          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;