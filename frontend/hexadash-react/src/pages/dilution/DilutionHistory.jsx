import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Tag } from "antd";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

function DilutionHistory() {

  const [dilutions, setDilutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDilutions();
  }, []);

  const fetchDilutions = async () => {
    try {

      const res = await API.get("/dilutions");
      setDilutions(res.data.data || []);

    } catch (error) {
      console.error(error);
      message.error("Failed to load dilutions");
    }
  };

  const handleDelete = async (id) => {

    try {

      await API.delete(`/dilutions/${id}`);

      message.success("Dilution deleted");
      fetchDilutions();

    } catch (error) {

      console.error(error);
      message.error("Delete failed");

    }

  };

 const columns = [

{
  title: "Chemical",
  render: (_, record) =>
    record.chemical?.name || record.chemicalName || "-"
},

{
  title: "Oil (ml)",
  dataIndex: "oilAmount"
},

{
  title: "Alcohol (ml)",
  dataIndex: "alcoholAmount"
},

{
  title: "Strength %",
  dataIndex: "strength"
},

{
  title: "Total Volume",
  dataIndex: "totalVolume"
},

{
  title: "Batch",
  render: (_, record) => record.batchNumber || "-"
},

{
  title: "Actions",
  render: (_, record) => (

    <div style={{ display: "flex", gap: 10 }}>

      <Button
        type="link"
        onClick={() =>
          navigate(`/admin/dilution/edit/${record._id}`)
        }
      >
        Edit
      </Button>

      <Popconfirm
        title="Delete this dilution?"
        onConfirm={() => handleDelete(record._id)}
      >
        <Button type="link" danger>
          Delete
        </Button>
      </Popconfirm>

    </div>

  )
}

];

  return (

    <div style={{ padding: 20 }}>

      <h2>Dilution History</h2>

      <Table
        columns={columns}
        dataSource={dilutions}
        rowKey="_id"
      />

    </div>

  );

}

export default DilutionHistory;