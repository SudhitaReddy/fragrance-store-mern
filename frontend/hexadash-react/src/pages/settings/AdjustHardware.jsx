import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdjustHardware() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [type, setType] = useState("add"); // add | reduce | set
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await API.get(`/hardware/${id}`);
      setItem(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || quantity <= 0) {
      alert("Enter valid quantity");
      return;
    }

    try {
      await API.post(`/hardware/adjust/${id}`, {
        type,
        quantity: Number(quantity),
        reason,
      });

      alert("Stock updated successfully");
      navigate("/admin/settings/hardware");

    } catch (err) {
      console.error(err);
      alert("Error updating stock");
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container mt-4">

      <h4>Adjust Stock</h4>

      <div className="card p-4 mt-3">

        <h5>{item.name}</h5>
        <p>Current Stock: <strong>{item.quantity}</strong></p>

        <form onSubmit={handleSubmit}>

          {/* TYPE */}
          <div className="mb-3">
            <label className="form-label">Adjustment Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="add">Add Stock</option>
              <option value="reduce">Reduce Stock</option>
              <option value="set">Set Exact Quantity</option>
            </select>
          </div>

          {/* QUANTITY */}
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* REASON */}
          <div className="mb-3">
            <label className="form-label">Reason</label>
            <input
              type="text"
              className="form-control"
              placeholder="Restock / Damage / Correction"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">
            Save Adjustment
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdjustHardware;