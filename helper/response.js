exports.response = (res, status, message, data, error) => {
  res.status(status).json({
    message,
    ...(data && { data }),
    status,
    ...(error && { error }),
  });
};
