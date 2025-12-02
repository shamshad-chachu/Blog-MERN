const mongoose = require("mongoose")

const connectDB = (url) =>{
  return mongoose.connect(url)
  .then(()=>console.log("connected to db"))
  .catch(err=>console.log("DB Error",err))
}

module.exports = connectDB