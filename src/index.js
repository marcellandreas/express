const dotenv = require("dotenv");

dotenv.config();

// Import the Express Module
const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();
const cookieParser = require("cookie-parser");
const middlewareLogRequest = require("./middleware/logs.js");

const usersRoutes = require("./routes/users.js");

app.use(middlewareLogRequest);
// req body by json
app.use(express.json());

app.use("/users", usersRoutes);

// app.use("/admin");

// Import middleware
const jwt = require("./middleware/admin");
app.use(cookieParser());
// Bind middleware ke server
app.use(jwt());

// Bind router ke server
app.use(require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server Berhasil di running di port ${PORT}`);
});
