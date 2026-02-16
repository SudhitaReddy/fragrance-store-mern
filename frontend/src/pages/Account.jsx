import React from "react";

export default function Account() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>Please login</p>;
  }

  return (
    <div className="account-page">

      <h2>My Account</h2>

      <div className="account-card">

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

      </div>

    </div>
  );
}
