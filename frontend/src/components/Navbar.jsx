import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="logo">
          FragranceCo
        </Link>

        {/* Menu */}
        <nav className="nav-menu">

          <Link to="/" className="nav-link">
            Home
          </Link>

          {token && (
            <Link to="/account" className="nav-link">
              My Account
            </Link>
          )}

          {!token && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}

          {!token && (
            <Link to="/signup" className="btn-primary">
              Signup
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              Logout
            </button>
          )}

        </nav>

      </div>

    </header>
  );
}
