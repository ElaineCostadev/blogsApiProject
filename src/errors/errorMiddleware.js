const errorMiddleware = (err, _req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });

  next(err);
};
  
module.exports = errorMiddleware;