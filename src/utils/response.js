//src/utils/response
exports.SuccessResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};
