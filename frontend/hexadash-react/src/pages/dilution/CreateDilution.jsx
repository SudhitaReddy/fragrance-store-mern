import React, { useEffect, useState } from "react";
import { Select, InputNumber, Button, Card, Typography } from "antd";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title, Text } = Typography;

function CreateDilution() {

  const [chemicals, setChemicals] = useState([]);
  const [chemical, setChemical] = useState(null);
  const [oil, setOil] = useState(10);
  const [strength, setStrength] = useState(20);

  const navigate = useNavigate();

  useEffect(() => {
    fetchChemicals();
  }, []);

  const fetchChemicals = async () => {

    const res = await API.get("/chemicals");
    setChemicals(res.data.data || []);

  };

  const alcohol = oil * ((100 - strength) / strength);
  const total = oil + alcohol;

  const createDilution = async () => {

    if (!chemical) {
      return alert("Select chemical");
    }

    try {

      await API.post("/dilutions", {
        chemicalId: chemical,
        oilAmount: oil,
        strength
      });

      alert("Dilution created");

      navigate("/admin/dilution");

    } catch (error) {

      console.error(error);
      alert("Dilution failed");

    }

  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto" }}>

      <Title level={3}>Create Dilution</Title>

      <Text>Select Chemical</Text>

      <Select
        style={{ width: "100%", marginBottom: 20 }}
        onChange={setChemical}
      >
        {chemicals.map(c => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>

      <Text>Oil Amount (ml)</Text>

      <InputNumber
        value={oil}
        onChange={setOil}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <Text>Strength (%)</Text>

      <InputNumber
        value={strength}
        min={1}
        max={40}
        onChange={setStrength}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <div style={{ marginBottom: 20 }}>
        <p>Alcohol Needed: <b>{alcohol.toFixed(2)} ml</b></p>
        <p>Total Volume: <b>{total.toFixed(2)} ml</b></p>
      </div>

      <Button type="primary" block onClick={createDilution}>
        Create Dilution
      </Button>

    </Card>
  );
}

export default CreateDilution;