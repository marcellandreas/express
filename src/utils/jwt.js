const jwt = require("jsonwebtoken");

const secret = "my-secret-key";

module.exports = {
  sign: (payload, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
  },
  verify: (token) => {
    return jwt.verify(token, secret);
  },
};
