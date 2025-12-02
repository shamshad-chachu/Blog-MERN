const { StatusCodes } = require("http-status-codes")

class CustomeApiError extends Error{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

module.exports = CustomeApiError