import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/profile")
      .then(res => setUser(res.data))
      .catch(() => alert("Session expired"));
  }, []);

  return (
    <div style={{ padding: 40 }}>

      <h1>Dashboard</h1>

      {user && (
        <p>Welcome, {user.name}</p>
      )}

    </div>
  );
}
