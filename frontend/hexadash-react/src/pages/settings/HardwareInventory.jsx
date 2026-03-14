import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HardwareInventory() {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {
    try {
      const res = await API.get("/hardware");
      setItems(res.data.data || []);
    } catch (error) {
      console.error("Fetch hardware error:", error);
    }
  };

  // USE HARDWARE
  const useItem = async (item) => {

    if (item.quantity <= 0) {
      alert("No hardware left");
      return;
    }

    try {

      await API.put(`/hardware/${item._id}`, {
        quantity: item.quantity - 1
      });

      fetchHardware();

    } catch (error) {

      console.error(error);

    }

  };

  // ADD QUICK QUANTITY
  const addQty = async (item, amount) => {

    try {

      await API.put(`/hardware/${item._id}`, {
        quantity: item.quantity + amount
      });

      fetchHardware();

    } catch (error) {

      console.error(error);

    }

  };

  // DELETE HARDWARE
  const deleteItem = async (id) => {

    if (!window.confirm("Delete this hardware item?")) return;

    try {

      await API.delete(`/hardware/${id}`);

      fetchHardware();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="container-fluid mt-3">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>Hardware Inventory</h3>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/settings/hardware/add")}
        >
          + Add Hardware
        </button>

      </div>

      {/* EMPTY STATE */}

      {items.length === 0 && (
        <div className="text-center mt-5">
          <h5>No hardware items added yet</h5>
        </div>
      )}

      {/* HARDWARE GRID */}

      <div className="row">

        {items.map((item) => (

          <div
            className="col-md-4 col-lg-3 mb-4"
            key={item._id}
          >

            <div className="card shadow-sm h-100">

              <div className="card-body text-center">

                <h5 className="card-title">
                  {item.name}
                </h5>

                <p className="text-muted">
                  {item.type || "Hardware Item"}
                </p>

                <h4 className="mb-3">
                  Qty: {item.quantity}
                </h4>

                <div className="d-flex justify-content-center gap-2 flex-wrap">

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => useItem(item)}
                  >
                    Use
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => addQty(item, 1)}
                  >
                    +1
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => addQty(item, 5)}
                  >
                    +5
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      navigate(`/admin/settings/hardware/edit/${item._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default HardwareInventory;