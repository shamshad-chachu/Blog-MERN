const { StatusCodes } = require("http-status-codes")
const CustomeApiError = require("./custome-api")

class UnauthenticatedError extends CustomeApiError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthenticatedError