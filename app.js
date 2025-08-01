const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
require("dotenv").config(); // ✅ Ensure environment variables are loaded

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ Explicitly set views dir
app.use(ejsLayouts);
app.set("layout", "layout"); // Uses views/layout.ejs

// Routes
const quizRouter = require("./routes/quiz");
app.use("/", quizRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Quiz app running at http://localhost:${PORT}`);
});
