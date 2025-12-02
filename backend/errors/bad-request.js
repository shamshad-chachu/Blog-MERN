const { StatusCodes } = require("http-status-codes")
const CustomeApiError = require("./custome-api")

class BadRequestError extends CustomeApiError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError