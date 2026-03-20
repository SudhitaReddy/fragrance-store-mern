import React, { useEffect, useState } from "react";
import { Card, Row, Col, InputNumber, Select, Button, Tag } from "antd";
import { useNavigate }  from "react-router-dom";
import { message } from "antd";
import API from "../../api/api";

const { Option } = Select;

function Dilution() {

  const navigate = useNavigate();

  const [chemicals, setChemicals] = useState([]);
  const [strength, setStrength] = useState(20);
  const [oilAmounts, setOilAmounts] = useState({});

  useEffect(() => {
    fetchChemicals();
  }, []);

  const fetchChemicals = async () => {
    const res = await API.get("/chemicals");
    setChemicals(res.data.data || []);
  };

  const handleOilChange = (id, value) => {
    setOilAmounts({
      ...oilAmounts,
      [id]: value || 0
    });
  };

  const calculateAlcohol = (oil) => {
    if (!oil || !strength) return 0;
    return oil * ((100 - strength) / strength);
  };

  const calculateTotal = (oil) => {
    const alcohol = calculateAlcohol(oil);
    return oil + alcohol;
  };

    const createDilution = async (chemicalId) => {

    const oil = oilAmounts[chemicalId] || 0;

    if (!oil) {
      return alert("Enter oil amount");
    }

    try {

      await API.post("/dilutions", {
        chemicalId,
        oilAmount: oil,
        strength
      });

      message.success("Dilution created");

      fetchChemicals(); // refresh inventory

    } catch (error) {

      console.error(error);
      alert("Dilution failed");

    }

  };

  return (
    <div style={{ padding: 20 }}>

      <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}>

          <h2>Dilution Lab</h2>

          <Button
            type="primary"
            onClick={() => navigate("/admin/dilution/history")}
          >
            📋 View All Dilutions
          </Button>

        </div>

      <div style={{ marginBottom: 20 }}>
        <Select
          value={strength}
          style={{ width: 200 }}
          onChange={setStrength}
        >
          <Option value={30}>Parfum 30%</Option>
          <Option value={20}>EDP 20%</Option>
          <Option value={10}>EDT 10%</Option>
          <Option value={5}>Cologne 5%</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>

        {chemicals.map((chem) => {

          const oil = oilAmounts[chem._id] || 0;
          const alcohol = calculateAlcohol(oil);
          const total = calculateTotal(oil);

          return (
            <Col xs={24} md={8} key={chem._id}>

              <Card
                title={chem.name}
                variant="outlined" 
                style={{
                  borderRadius: 10,
                  background: chem.category?.color || "#fafafa"
                }}
              >

                <Tag color="blue">
                  Stock: {chem.stock} ml
                </Tag>

                <div style={{ marginTop: 15 }}>

                  <p>Oil Amount (ml)</p>

                  <InputNumber
                    min={0}
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
                  <b>{total.toFixed(2)} ml</b>
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