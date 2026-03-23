import React, { useEffect, useState } from "react";
import { Card, Row, Col, InputNumber, Button, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function Dilution() {

  const navigate = useNavigate();

  const [chemicals, setChemicals] = useState([]);
  const [oilAmounts, setOilAmounts] = useState({});

  const TOTAL_VOLUME = 100; // ✅ Fixed total

  useEffect(() => {
    fetchChemicals();
  }, []);

  const fetchChemicals = async () => {
    try {
      const res = await API.get("/chemicals");
      setChemicals(res.data.data || []);
    } catch (err) {
      message.error("Failed to load chemicals");
    }
  };

  const handleOilChange = (id, value) => {
    setOilAmounts({
      ...oilAmounts,
      [id]: value || 0
    });
  };

  // ✅ FIXED 100ML LOGIC
  const calculateValues = (oil) => {

    if (!oil || oil <= 0) {
      return { oil: 0, alcohol: 0, total: TOTAL_VOLUME };
    }

    if (oil > TOTAL_VOLUME) {
      return { oil, alcohol: 0, total: TOTAL_VOLUME };
    }

    const alcohol = TOTAL_VOLUME - oil;

    return {
      oil,
      alcohol,
      total: TOTAL_VOLUME
    };
  };

  const createDilution = async (chemicalId) => {

    const oil = oilAmounts[chemicalId] || 0;

    if (!oil) {
      return message.warning("Enter oil amount");
    }

    if (oil > TOTAL_VOLUME) {
      return message.error("Oil cannot exceed 100 ml");
    }

    const { alcohol, total } = calculateValues(oil);

    const chem = chemicals.find(c => c._id === chemicalId);

    // ✅ STOCK CHECK
    if (oil > chem.stock) {
      return message.error("Not enough stock");
    }

    try {

      await API.post("/dilutions", {
        chemicalId,
        oilAmount: oil,
        alcoholAmount: alcohol,
        totalVolume: total
      });

      message.success("Dilution created");

      fetchChemicals();

    } catch (error) {
      console.error(error);
      message.error("Dilution failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>

        <h2>Dilution Lab (100ml Fixed)</h2>

        <Button
          type="primary"
          onClick={() => navigate("/admin/dilution/history")}
        >
          📋 View All Dilutions
        </Button>

      </div>

      {/* Chemical Cards */}
      <Row gutter={[16, 16]}>

        {chemicals.map((chem) => {

          const oil = oilAmounts[chem._id] || 0;
          const { alcohol, total } = calculateValues(oil);

          return (
            <Col xs={24} md={8} key={chem._id}>

              <Card
                title={chem.name}
                style={{
                  borderRadius: 12,
                  background: chem.category?.color || "#fafafa"
                }}
              >

                <Tag color="blue">
                  Stock: {chem.stock} ml
                </Tag>

                <Tag color="purple" style={{ marginLeft: 10 }}>
                  Fixed 100ml Batch
                </Tag>

                <div style={{ marginTop: 15 }}>
                  <p>Oil Amount (ml)</p>

                  <InputNumber
                    min={0}
                    max={100}
                    style={{ width: "100%" }}
                    value={oil}
                    onChange={(value) =>
                      handleOilChange(chem._id, value)
                    }
                  />
                </div>

                <div style={{ marginTop: 15 }}>
                  <p>Alcohol Needed</p>
                  <b>{alcohol.toFixed(2)} ml</b>
                </div>

                <div style={{ marginTop: 10 }}>
                  <p>Total Volume</p>
                  <b>{total} ml</b>
                </div>

                <Button
                  type="primary"
                  style={{ marginTop: 15, width: "100%" }}
                  onClick={() => createDilution(chem._id)}
                >
                  Create Dilution
                </Button>

              </Card>

            </Col>
          );
        })}

      </Row>

    </div>
  );
}

export default Dilution;