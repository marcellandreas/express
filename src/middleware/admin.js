// middlewares/jwt.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Cek apakah ada token di cookie
  const token = req.cookies.token;

  // Jika tidak ada token, tolak akses
  if (!token) {
    return res.status(401).send("Token tidak ditemukan");
  }

  // Validasi token
  try {
    const decoded = jwt.verify(token, "secret");
  } catch (err) {
    return res.status(401).send("Token tidak valid");
  }

  // Set properti `user` di request
  req.user = decoded;

  // Lanjutkan ke route berikutnya
  next();
};
