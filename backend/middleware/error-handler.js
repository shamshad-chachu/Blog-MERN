const { CustomeApiError } = require("../errors");
const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, please try again later",
  };

  if (err.code && err.code === 11000) {
    customError.statusCode = 400; // HTTP 400 Bad Request

    // Extract the duplicated field name (e.g., 'email')
    const field = Object.keys(err.keyValue)[0];

    if (field === "email") {
      customError.msg = "Email already exists. Please use a different email.";
    } else {
      customError.msg = `The ${field} already exists.`;
    }
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }

  if (err instanceof CustomeApiError) {
    customError.statusCode = err.statusCode;
    customError.msg = err.message;
  }

  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, statusCode: customError.statusCode });
};

module.exports = ErrorHandlerMiddleware;
