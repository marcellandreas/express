const adminsModels = require("../models/admin");
const jwt = require("");

const getAllAdmins = async (req, res) => {
  try {
    const [data] = await adminsModels.getAllAdmins();
    res.json({
      message: "GET all Admin success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

// Create route for login
// app.post("/login", async (req, res) => {
//   // Get username and password from request body
//   const username = req.body.username;
//   const password = req.body.password;

//   // Check if username and password are valid
//   const sql = `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`;
//   const result = await connection.query(sql);

//   if (result.length === 0) {
//     res.status(401).send("Invalid username or password");
//   } else {
//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         username: username,
//       },
//       "secret",
//       {
//         expiresIn: 3600,
//       }
//     );

//     // Set token as cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//     });

//     // Send success response
//     res.send({
//       success: true,
//       message: "Login successful",
//     });
//   }
// });

// controllers/admin.js
const AdminController = {
  login: (req, res) => {
    // Dapatkan data dari request
    const username = req.body.username;
    const password = req.body.password;

    // Query database
    const query = `
       SELECT *
       FROM admins
       WHERE username = '${username}'
       AND password = '${password}'
     `;

    connection.query(query, (err, results) => {
      // Jika ada error
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Jika data tidak ditemukan
      if (results.length === 0) {
        res.status(401).send("Username atau password salah");
        return;
      }

      // Jika data ditemukan
      const admin = results[0];

      // Buat token JWT
      const token = jwt.sign(
        {
          id: admin.id,
          username: admin.username,
        },
        "secret",
        {
          expiresIn: "30m",
        }
      );

      // Set cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
        httpOnly: true,
      });

      // Kirim response
      res.status(200).send({
        id: admin.id,
        username: admin.username,
      });
    });
  },
};

module.exports = {
  getAllAdmins,
  AdminController,
};
