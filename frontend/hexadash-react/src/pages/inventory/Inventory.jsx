import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Tag, Progress, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function Inventory() {
  const [chemicals, setChemicals] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchChemicals();
  }, []);

  // FETCH CHEMICALS
  const fetchChemicals = async () => {
    try {
      setLoading(true);

      const res = await API.get("/chemicals");

      setChemicals(res?.data?.data || []);
    } catch (error) {
      console.error("Fetch chemicals error:", error);
      setChemicals([]);
    } finally {
      setLoading(false);
    }
  };

  // ADD TO FORMULA
  const handleAddToFormula = (chemical) => {
    try {
      const existing =
        JSON.parse(localStorage.getItem("selectedChemicals")) || [];

      const alreadyExists = existing.find(
        (item) => item._id === chemical._id
      );

      if (!alreadyExists) {
        existing.push({
          _id: chemical._id,
          name: chemical.name,
          stock: chemical.stock,
          percent: 0,
          category: chemical.category
        });

        localStorage.setItem(
          "selectedChemicals",
          JSON.stringify(existing)
        );
      }

      navigate("/admin/formula");
    } catch (error) {
      console.error("Add to formula error:", error);
    }
  };

  // EDIT CHEMICAL
  const handleEdit = (chemical) => {
    if (!chemical?._id) return;

    navigate(`/admin/inventory/edit/${chemical._id}`);
  };

  // DELETE CHEMICAL
  const handleDelete = async (id) => {
    try {
      await API.delete(`/chemicals/${id}`);

      fetchChemicals();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading chemicals...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Inventory</h2>

        <Button
          type="primary"
          onClick={() => navigate("/admin/inventory/add")}
        >
          + Add Chemical
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {Array.isArray(chemicals) &&
          chemicals.map((item) => {
            const lowStock = item.stock < 1500;

            return (
              <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 10,
                    height: 260,
                    background: item.category?.color || "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3>{item.name}</h3>

                    <Tag
                      style={{
                        background: item.category?.color || "#1890ff",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      {item.category?.name}
                    </Tag>

                    {lowStock && (
                      <Tag color="red" style={{ marginLeft: 5 }}>
                        Low Stock
                      </Tag>
                    )}

                    <p style={{ marginTop: 10 }}>
                      Stock: <strong>{item.stock} ml</strong>
                    </p>

                    <Progress
                      percent={Math.min((item.stock / 6000) * 100, 100)}
                      showInfo={false}
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      type="primary"
                      block
                      onClick={() => handleAddToFormula(item)}
                    >
                      Add To Formula
                    </Button>

                    <Button onClick={() => handleEdit(item)}>
                      Edit
                    </Button>

                    <Popconfirm
                      title="Delete this chemical?"
                      onConfirm={() => handleDelete(item._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Inventory;