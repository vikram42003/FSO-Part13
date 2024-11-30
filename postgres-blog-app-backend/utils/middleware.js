const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV != "production") {
    console.log(error);
  }

  if (error.message) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "Unknown error occured" });
  }

  next(error);
};

module.exports = {
  errorHandler,
};