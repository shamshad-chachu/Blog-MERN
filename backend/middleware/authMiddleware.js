const { UnAuthenticated } = require("../errors")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const auth = async (req,res,next) =>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnAuthenticated("Unthorised Access !")
  }
  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    console.log(payload);
    req.user = {userId:payload.userId, name:payload.name}
    next()
  } catch (error) {
    throw new UnAuthenticated("Unthorised Access , invalid tocken!")
  }
}

module.exports = auth