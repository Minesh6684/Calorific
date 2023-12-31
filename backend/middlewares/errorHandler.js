const errorHandler = async (err, req, res, next) => {
  const status_code = (await res.statusCode) ? res.statusCode : 500;
  res.status(status_code);
  // throw new Error("Please check your network connection");
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
