// src/middlewares/authorize.js

const authorize = (req, res, next) => {
  const user = req.user;

  // Perbolehkan semua pengguna untuk mengakses GET
  if (req.method === "GET") {
    return next();
  }

  // Batasi akses untuk POST, PUT, dan DELETE hanya untuk role_id 1
  if (user.role_id !== 1) {
    return res.status(403).json({
      message:
        "Access forbidden: you do not have permission to perform this action.",
    });
  }

  next(); // Lanjutkan jika role_id adalah 1
};

module.exports = authorize;
