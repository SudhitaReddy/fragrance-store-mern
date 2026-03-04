import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/auth/forgot-password", { email });
    alert("Reset link sent");
  } catch (err) {
    alert("Error sending reset link");
  }
};

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-md-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h3 className="text-center mb-4 fw-bold">Forgot Password</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Enter your email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-decoration-none">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}