function requireLogin(req, res, next) {
  // Chưa dùng thật. File này chỉ chuẩn bị vị trí middleware xác thực.
  next();
}

module.exports = { requireLogin };
