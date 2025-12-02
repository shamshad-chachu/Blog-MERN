const {StatusCodes} = require("http-status-codes")
const User = require("../models/User")
const { BadRequestError, UnAuthenticated } = require("../errors")


//Register
const Register =async (req,res)=>{
  // console.log(req.body);
  const user = await User.create({...req.body})
  console.log(user);
  const token = user.CreateJwt()
  res.status(StatusCodes.CREATED).json({user:{name:user.getName(),userId:user._id},token})
}

//Login
const Login =async (req,res)=>{
  const {email,password} = req.body

  if(!email || !password){
    throw new BadRequestError("please provide email and password")
  }
  const user = await User.findOne({email})

  if(!user){
     throw new UnAuthenticated("invalid Credential")
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new UnAuthenticated("invalid Credential")
  }

  const token = user.CreateJwt()
  res.status(StatusCodes.OK).json({user:{name:user.getName(),userId:user._id},token})
}

module.exports = {
  Register,Login
}