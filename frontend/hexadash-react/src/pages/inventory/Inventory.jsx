import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Tag, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function Inventory() {
  const [chemicals, setChemicals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChemicals();
  }, []);

  const fetchChemicals = async () => {
    try {
      const { data } = await API.get("/chemicals");
      setChemicals(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFormula = (chemical) => {
    const existing =
      JSON.parse(localStorage.getItem("selectedChemicals")) || [];

    const alreadyExists = existing.find(
      (item) => item._id === chemical._id
    );

    if (!alreadyExists) {
      existing.push({ ...chemical, percent: 0 });
      localStorage.setItem(
        "selectedChemicals",
        JSON.stringify(existing)
      );
    }

    navigate("/admin/formula"); // optional
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Inventory</h2>

      <Row gutter={[16, 16]}>
        {chemicals.map((item) => {
          const lowStock = item.stock < 1500;

          return (
            <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
              <Card
                hoverable
                style={{
                  borderRadius: 10,
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3>{item.name}</h3>

                  <Tag color="blue">{item.category}</Tag>

                  {lowStock && (
                    <Tag color="red" style={{ marginLeft: 5 }}>
                      Low Stock
                    </Tag>
                  )}

                  <p style={{ marginTop: 10 }}>
                    Stock: <strong>{item.stock} ml</strong>
                  </p>

                  <Progress
                    percent={(item.stock / 6000) * 100}
                    showInfo={false}
                  />
                </div>

                <Button
                  type="primary"
                  block
                  onClick={() => handleAddToFormula(item)}
                >
                  Add To Formula
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Inventory;