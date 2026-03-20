import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Login clicked");

  try {
    const res = await API.post("/auth/login", form);

    console.log("Login success:", res.data);

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/Home");

  } catch (err) {
    console.log("Login error:", err.response?.data);
    alert(err.response?.data?.msg || "Login failed");
  }
};

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-5 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <h3 className="text-center mb-4 fw-bold">Sign In</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-4">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-decoration-none fw-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}