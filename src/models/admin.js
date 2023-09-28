const pool = require("../config/database");

const getAllAdmins = () => {
  const SQLQuery = "SELECT * FROM admins";

  return pool.execute(SQLQuery);
};

const loginAdmin = (body) => {
  const { username, password } = body;
  const SQLQuery = `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`;
  return pool.execute(SQLQuery);
};

const Admin = {
  id: {
    type: Number,
    primaryKey: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

module.exports = {
  getAllAdmins,
  loginAdmin,
  Admin,
};
