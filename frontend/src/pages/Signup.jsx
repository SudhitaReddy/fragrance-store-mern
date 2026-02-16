import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert(res.data.msg);

      // Go to OTP page
      navigate("/verify", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h2>Create Account</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          {loading ? "Creating..." : "Signup"}
        </button>

      </div>

    </div>
  );
}
