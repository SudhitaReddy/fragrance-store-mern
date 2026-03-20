import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HardwareInventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {
    try {
      setLoading(true);
      const res = await API.get("/hardware");
      setItems(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/hardware/${id}`);
      fetchHardware();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    const confirm = window.confirm("Move this item to recycle bin?");
    if (confirm) deleteItem(id);
  };

  // 🔍 FILTER (name + type)
  const filtered = items.filter((item) =>
    (item.name + item.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📊 STATUS LOGIC
  const getStatus = (qty) => {
    if (qty === 0) return { text: "Out of Stock", color: "danger" };
    if (qty <= 5) return { text: "Low Stock", color: "warning" };
    return { text: "In Stock", color: "success" };
  };

  return (
    <div className="container-fluid mt-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Hardware Inventory</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/settings/hardware/add")}
        >
          + Add Hardware
        </button>
      </div>

      {/* 📊 STATS CARDS */}
      <div className="row mb-3">

        <div className="col-md-3">
          <div className="card p-2 text-center shadow-sm">
            <small>Total Items</small>
            <h5>{items.length}</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2 text-center shadow-sm">
            <small>Low Stock</small>
            <h5>
              {items.filter(i => i.quantity <= 5 && i.quantity > 0).length}
            </h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2 text-center shadow-sm">
            <small>Out of Stock</small>
            <h5>
              {items.filter(i => i.quantity === 0).length}
            </h5>
          </div>
        </div>

      </div>

      {/* 🔍 SEARCH */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-center mt-4">Loading hardware...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Status</th>
                <th style={{ width: "260px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => {
                const status = getStatus(item.quantity);

                return (
                  <tr
                    key={item._id}
                    className={
                      item.quantity === 0
                        ? "table-danger"
                        : item.quantity <= 5
                        ? "table-warning"
                        : ""
                    }
                  >
                    <td><strong>{item.name}</strong></td>

                    <td>{item.type || "-"}</td>

                    <td>
                      <span className="fw-bold">
                        {item.quantity}
                      </span>
                    </td>

                    <td>
                      <span className={`badge bg-${status.color}`}>
                        {status.text}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2 flex-wrap">

                        {/* ADJUST */}
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            navigate(`/admin/settings/hardware/adjust/${item._id}`)
                          }
                        >
                          Adjust
                        </button>

                        {/* EDIT */}
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() =>
                            navigate(`/admin/settings/hardware/edit/${item._id}`)
                          }
                        >
                          Edit
                        </button>

                        {/* DELETE → RECYCLE */}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => confirmDelete(item._id)}
                        >
                          Move to Bin
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No hardware found. Click "Add Hardware" to create one.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default HardwareInventory;