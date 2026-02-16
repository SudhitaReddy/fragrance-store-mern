import React, { useState } from "react";
import API from "../api/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {

    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot", { email });

      alert(res.data.msg);

    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Forgot Password</h2>

        <p>Enter your registered email</p>

        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleForgot}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </div>

    </div>
  );
}
