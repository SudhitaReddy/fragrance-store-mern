import React, { useEffect, useState } from "react";
import { Card, Input, Button, Tabs, message } from "antd";
import API from "../../api/api";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data.data || {});
    } catch (err) {
      console.error(err);
      message.error("Failed to load profile");
    }
  };

  // ✅ Handle Input Change
  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Save Profile
  const handleSave = async () => {
    try {
      await API.put("/users/profile", profile);
      message.success("Profile updated");
    } catch (err) {
      console.error(err);
      message.error("Update failed");
    }
  };

  // ✅ Handle Password Change
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const changePassword = async () => {
    try {
      await API.put("/users/change-password", passwordData);

      message.success("Password changed");

      setPasswordData({
        oldPassword: "",
        newPassword: ""
      });

    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Error");
    }
  };

  // ✅ NEW Tabs format (IMPORTANT FIX)
  const tabItems = [
    {
      key: "1",
      label: "Profile",
      children: (
        <>
          <p>Name</p>
          <Input
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <p style={{ marginTop: 10 }}>Email</p>
          <Input value={profile.email} disabled />

          <p style={{ marginTop: 10 }}>Phone</p>
          <Input
            value={profile.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <p style={{ marginTop: 10 }}>Company</p>
          <Input
            value={profile.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />

          <p style={{ marginTop: 10 }}>Address</p>
          <Input.TextArea
            value={profile.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={handleSave}
          >
            Save Profile
          </Button>
        </>
      )
    },
    {
      key: "2",
      label: "Change Password",
      children: (
        <>
          <p>Old Password</p>
          <Input.Password
            value={passwordData.oldPassword}
            onChange={(e) =>
              handlePasswordChange("oldPassword", e.target.value)
            }
          />

          <p style={{ marginTop: 10 }}>New Password</p>
          <Input.Password
            value={passwordData.newPassword}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
          />

          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={changePassword}
          >
            Update Password
          </Button>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card title="Settings" style={{ maxWidth: 700 }}>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  );
}

export default Profile;