import React, { useState } from "react";
import { Card, Input, Button, Typography, Divider, message } from "antd";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;


function GenerateAI() {

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [formula, setFormula] = useState("");
  const [loading, setLoading] = useState(false);

  const generateFormula = async () => {
    try {
      setLoading(true);

      const res = await API.post("/ai/generate", { prompt });

      setFormula(res.data.formula);
    } catch (err) {
      message.error("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyFormula = () => {
    navigator.clipboard.writeText(formula);
    message.success("Formula copied");
  };

  return (
    <Card style={{ maxWidth: 800, margin: "auto" }}>
      <Title level={3}>AI Fragrance Formula Generator</Title>

      <Paragraph>
        Describe the fragrance and AI will generate a formula.
      </Paragraph>

      <TextArea
        rows={4}
        placeholder="Example: Fresh citrus fragrance with woody base"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        type="primary"
        style={{ marginTop: 20 }}
        loading={loading}
        onClick={generateFormula}
      >
        Generate Formula
      </Button>

      {formula && (
        <>
          <Divider />

          <Title level={4}>Generated Formula</Title>

          <pre>{formula}</pre>

          <Button type="default" onClick={copyFormula}>
          Copy Formula
        </Button>

        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() =>
            navigate("/admin/formula", {
              state: { formula }
            })
          }
        >
          Use in Formula Builder
        </Button>
        </>
      )}
    </Card>
  );
}

export default GenerateAI;