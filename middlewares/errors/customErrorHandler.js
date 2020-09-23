const CustomError = require("../../helpers/error/CustomError");

const customErrorHanler = (err, req, res, next) => {
  let customError = err;

  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected Syntax", 400);
  }
  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400);
  }
  if (err.code === 11000) {
    customError = new CustomError("duplicate key found:check your input");
  }

  //console.log(customError.name,customError.message,customError.status);

  res.status(customError.status || 500).json({
    success: false,
    message: customError.message || "internal server error",
  });
};
module.exports = customErrorHanler;
