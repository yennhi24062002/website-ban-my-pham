function notImplemented(featureName) {
  return (req, res) => {
    res.status(501).json({
      feature: featureName,
      message: "Chức năng này mới tạo khung, chưa triển khai xử lý thật."
    });
  };
}

module.exports = { notImplemented };
