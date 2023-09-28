const logRequest = (req, res, next) => {
  console.log("log terjadi request ke API ini", req.path);
  next();
};

module.exports = logRequest;
