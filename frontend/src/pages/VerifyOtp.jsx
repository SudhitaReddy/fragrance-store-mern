import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from signup
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/verify", {
        email,
        otp,
      });

      alert(res.data.msg);

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Verify OTP</h2>

        <p>Enter the OTP sent to your email</p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>
          {loading ? "Verifying..." : "Verify"}
        </button>

      </div>

    </div>
  );
}
