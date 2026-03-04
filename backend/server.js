const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// 🔥 NEW ROUTES
const chemicalRoutes = require("./routes/chemicalRoutes");
const formulaRoutes = require("./routes/formulaRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const dilutionRoutes = require("./routes/dilutionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 🔥 ADD THESE
app.use("/api/chemicals", chemicalRoutes);
app.use("/api/formulas", formulaRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dilution", dilutionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});