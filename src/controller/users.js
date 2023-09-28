const usersModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await usersModel.getAllUsers();
    res.json({
      message: "GET all users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewUser = (req, res) => {
  console.log(req.body);
  res.json({
    message: "CREATE new user succes",
    data: req.body,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  res.json({
    message: "UPDATE user sucees",
    data: req.body,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({
    message: "DELETE user Sucess",
    data: {
      id: id,
      nama: "marcell",
    },
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
