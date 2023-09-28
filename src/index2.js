// Import the Express module
const express = require("express");

// Import the MySQL module
const mysql = require("mysql");

// Import the JWT module
const jwt = require("jsonwebtoken");

// Create a new Express application
const app = express();

// Set the port number
const port = 3000;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "my_database",
  user: "root",
  password: "",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Database connected");
});

// Create a route to handle the login request
app.post("/login", (req, res) => {
  // Get the username and password from the request body
  const username = req.body.username;
  const password = req.body.password;

  // Check if the username and password are valid
  connection.query(
    `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(401).send({ error: "Invalid username or password" });
        return;
      }

      // The login is successful

      // Generate a token
      const token = jwt.sign(
        {
          id: results[0].id_admin,
          username: results[0].username,
          expiresIn: "1h",
        },
        secret
      );

      // Add the token to the response
      res.status(200).send({
        success: true,
        user: results[0],
        token,
      });
    }
  );
});

// Create a route to handle the logout request
app.post("/logout", (req, res) => {
  // Clear the user session
  req.session.destroy();

  // Delete the token cookie
  res.clearCookie("token");

  // Redirect to the home page
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
