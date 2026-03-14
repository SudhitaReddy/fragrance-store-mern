import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#0d6efd", "#20c997", "#ffc107", "#dc3545"];

function Home() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    chemicals: 0,
    formulas: 0,
    categories: 0,
    lowStock: [],
    recentFormulas: [],
    categoryStats: []
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

    <div className="container-fluid mt-3">

      {/* HERO */}

      <div className="card text-white mb-4"
        style={{
          background:"linear-gradient(120deg,#4facfe,#00f2fe)"
        }}
      >
        <div className="card-body">

          <h2>Welcome back, {firstName} 👋</h2>
          <p>Manage fragrance inventory and production efficiently.</p>

          <div className="mt-3">

            <button
              className="btn btn-light me-2"
              onClick={() => navigate("/admin/ai-formula")}
            >
              Generate AI Formula
            </button>

            <button
              className="btn btn-outline-light me-2"
              onClick={() => navigate("/admin/formula")}
            >
              Create Formula
            </button>

            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/admin/inventory")}
            >
              Add Chemical
            </button>

          </div>

        </div>
      </div>

      {/* STAT CARDS */}

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>Total Chemicals</h6>
              <h2>{stats.chemicals}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>Total Formulas</h6>
              <h2>{stats.formulas}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>Total Categories</h6>
              <h2>{stats.categories}</h2>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="row">

        {/* CATEGORY CHART */}

        <div className="col-md-4 mb-4">

          <div className="card shadow-sm">

            <div className="card-header">
              Category Distribution
            </div>

            <div className="card-body">

              <ResponsiveContainer width="100%" height={250}>

                <PieChart>

                  <Pie
                    data={stats.categoryStats || []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >

                    {(stats.categoryStats || []).map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip/>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* LOW STOCK */}

        <div className="col-md-4 mb-4">

          <div className="card shadow-sm">

            <div className="card-header">
              Low Stock Chemicals
            </div>

            <div className="card-body">

              <table className="table table-sm">

                <thead>

                  <tr>
                    <th>Chemical</th>
                    <th>Stock</th>
                  </tr>

                </thead>

                <tbody>

                  {stats.lowStock?.length === 0 && (

                    <tr>
                      <td colSpan="2">No low stock items</td>
                    </tr>

                  )}

                  {stats.lowStock?.map(item => (

                    <tr key={item._id}>

                      <td>{item.name}</td>
                      <td className="text-danger">
                        {item.stock}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* RECENT FORMULAS */}

        <div className="col-md-4 mb-4">

          <div className="card shadow-sm">

            <div className="card-header">
              Recent Formulas
            </div>

            <div className="card-body">

              <ul className="list-group list-group-flush">

                {stats.recentFormulas?.length === 0 && (
                  <li className="list-group-item">
                    No formulas created
                  </li>
                )}

                {stats.recentFormulas?.map(formula => (

                  <li
                    className="list-group-item"
                    key={formula._id}
                  >

                    {formula.name}

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Home;