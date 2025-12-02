const { StatusCodes } = require("http-status-codes")
const CustomeApiError = require("./custome-api")

class NotFoundError extends CustomeApiError{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError