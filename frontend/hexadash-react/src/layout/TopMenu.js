import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TopMenuStyle } from "./Style";

function TopMenu() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <TopMenuStyle>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold text-primary" to="/admin">
          🌿 Fragrance
        </NavLink>

        {/* Right Side */}
        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Search */}
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ width: "200px" }}
          />

          {/* User Menu */}
          {token && (
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle fw-semibold"
                data-bs-toggle="dropdown"
              >
                {firstName}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item">Profile</button>
                </li>

                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

        </div>

      </nav>
    </TopMenuStyle>
  );
}

export default TopMenu;