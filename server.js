const express = require("express");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");
app.use(cors());

//bring path module

const path = require("path");

// Connect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve static assets in Production
if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  // now we want to serve that file
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on  ${PORT}`));
