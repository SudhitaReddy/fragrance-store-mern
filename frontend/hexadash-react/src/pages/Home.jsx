import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    chemicals: 0,
    formulas: 0,
    categories: 0,
    lowStock: [],
    recentFormulas: [],
    categoryStats: [],
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] || "User";

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
  };

  return (
    <div className="container-fluid px-4 py-3">

      {/* 🔥 HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">HOME</h3>
          <p className="text-muted mb-0">
            Welcome back, {firstName} 👋
          </p>
        </div>

        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/admin/ai-formula")}
          >
            + AI Formula
          </button>

          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/admin/formula")}
          >
            + Create Formula
          </button>

          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/admin/inventory")}
          >
            + Add Chemical
          </button>
        </div>
      </div>

      {/* 🔥 KPI CARDS */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h6 className="text-muted">Total Chemicals</h6>
            <h2 className="fw-bold text-primary">{stats.chemicals}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h6 className="text-muted">Total Formulas</h6>
            <h2 className="fw-bold text-success">{stats.formulas}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h6 className="text-muted">Categories</h6>
            <h2 className="fw-bold text-warning">{stats.categories}</h2>
          </div>
        </div>

      </div>

      {/* 🔥 MAIN GRID */}
      <div className="row g-3">

        {/* CATEGORY CHART */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <h6 className="mb-3">Category Distribution</h6>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.categoryStats || []}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {(stats.categoryStats || []).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* LOW STOCK */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <h6 className="mb-3">⚠ Low Stock</h6>

            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Chemical</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {stats.lowStock?.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-muted">
                      No low stock items
                    </td>
                  </tr>
                ) : (
                  stats.lowStock.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td className="text-danger fw-bold">
                        {item.stock}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
        </div>

        {/* RECENT FORMULAS */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3 h-100">
            <h6 className="mb-3">Recent Formulas</h6>

            <ul className="list-group list-group-flush">
              {stats.recentFormulas?.length === 0 ? (
                <li className="list-group-item text-muted">
                  No formulas yet
                </li>
              ) : (
                stats.recentFormulas.map((formula) => (
                  <li
                    key={formula._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{formula.name}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        navigate(`/admin/formula/view/${formula._id}`)
                      }
                    >
                      View
                    </button>
                  </li>
                ))
              )}
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;