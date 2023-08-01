const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT;
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`server running on http://localhost:5000`);
});
connectDB();
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
