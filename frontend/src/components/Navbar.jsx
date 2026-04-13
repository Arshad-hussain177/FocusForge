import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">FocusForge</Link>
        </div>

        <div className="navbar-links">
          {!user ? (
            <>
              <Link className={isActive("/") ? "nav-link active" : "nav-link"} to="/">
                Home
              </Link>
              <Link className={isActive("/login") ? "nav-link active" : "nav-link"} to="/login">
                Login
              </Link>
              <Link
                className={isActive("/register") ? "nav-link active" : "nav-link"}
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className={isActive("/dashboard") ? "nav-link active" : "nav-link"}
                to="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className={isActive("/tasks") ? "nav-link active" : "nav-link"}
                to="/tasks"
              >
                Tasks
              </Link>
              <Link
                className={isActive("/rewards") ? "nav-link active" : "nav-link"}
                to="/rewards"
              >
                Rewards
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;