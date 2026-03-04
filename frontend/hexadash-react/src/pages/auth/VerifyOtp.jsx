import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/verify", {
      email,
      otp: otp.toString().trim(),
    });

    alert(res.data.msg);
    navigate("/login");
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.msg || "Verification failed");
  }
};

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-md-4">
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <h4 className="text-center mb-3 fw-bold">
              Verify Your Account
            </h4>

            <p className="text-center text-muted">
              Enter the OTP sent to your email
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">OTP Code</label>
                <input
                  type="text"
                  className="form-control text-center fs-5"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Verify OTP
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Didn’t receive OTP? Check spam folder
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}       