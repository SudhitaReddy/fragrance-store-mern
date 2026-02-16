import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {

    if (!password) {
      alert("Enter new password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(`/auth/reset/${token}`, {
        password,
      });

      alert(res.data.msg);

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>

    </div>
  );
}
