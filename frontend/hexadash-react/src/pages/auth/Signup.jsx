import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await API.post("/auth/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    alert(res.data.msg);

    navigate("/verify-otp", { state: { email: form.email } });

  } catch (err) {
    alert(err.response?.data?.msg || "Signup failed");
  }
};
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-md-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h3 className="text-center mb-4 fw-bold">Create Account</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
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

              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>

            <div className="text-center mt-4">
              <span>Already have an account? </span>
              <Link to="/login" className="fw-semibold text-decoration-none">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}