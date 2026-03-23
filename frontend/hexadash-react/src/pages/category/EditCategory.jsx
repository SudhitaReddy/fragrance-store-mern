import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import { Button } from "antd";
import EmojiPicker from "emoji-picker-react";
import API from "../../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

function EditCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    icon: "",
    color: "#1890ff",
  });

  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await API.get(`/categories/${id}`);
      const cat = data.data || data;

      setCategory({
        name: cat.name || "",
        description: cat.description || "",
        icon: cat.icon || "",
        color: cat.color || "#1890ff"
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  // 🎨 COLOR CHANGE
  const handleColorChange = (color) => {
    setCategory({
      ...category,
      color: color.hex
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/categories/${id}`, category);

      alert("Category updated");
      navigate("/admin/category");

    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h5>Edit Category</h5>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={category.description}
                onChange={handleChange}
              />
            </div>

            {/* 🔥 EMOJI PICKER */}
            <div className="mb-3">
              <label className="form-label">Icon</label>

              <div className="d-flex gap-3 align-items-center">

                {/* PREVIEW BOX */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: category.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#fff"
                  }}
                >
                  {category.icon || "😀"}
                </div>

                {/* BUTTON */}
                <Button onClick={() => setShowEmoji(!showEmoji)}>
                  Select Emoji
                </Button>

              </div>

              {/* EMOJI PICKER */}
              {showEmoji && (
                <div style={{ marginTop: 10 }}>
                  <EmojiPicker
                    onEmojiClick={(emojiData) => {
                      setCategory({
                        ...category,
                        icon: emojiData.emoji,
                      });
                      setShowEmoji(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* 🎨 COLOR PICKER */}
            <div className="mb-3">
              <label className="form-label">Category Color</label>

              <div className="d-flex gap-4 align-items-center">

                <SketchPicker
                  color={category.color}
                  onChangeComplete={handleColorChange}
                />

                {/* COLOR PREVIEW */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    background: category.color,
                    border: "1px solid #ddd"
                  }}
                />

              </div>

            </div>

            {/* ACTIONS */}
            <div className="d-flex justify-content-between">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/category")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Category"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCategory;