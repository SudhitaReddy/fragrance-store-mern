import React, { useState } from "react";
import { Card, InputNumber, Button, message } from "antd";
import { useParams } from "react-router-dom";
import API from "../../api/api";

function ProduceFormula() {

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1000);

  const produce = async () => {
    try {

      await API.post(`/formulas/produce/${id}`, {
        quantity,
      });

      message.success("Production completed");

    } catch (error) {
      console.error(error);
      message.error("Production failed");
    }
  };

  return (
    <Card title="Produce Formula">

      <p>Batch Size (ml)</p>

      <InputNumber
        value={quantity}
        min={1}
        onChange={setQuantity}
      />

      <br /><br />

      <Button
        type="primary"
        onClick={produce}
      >
        Start Production
      </Button>

    </Card>
  );
}

export default ProduceFormula;