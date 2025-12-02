if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config()
}
require("express-async-errors")

const user = require("./routes/user")
const Blog = require("./routes/blog")
const userBlog = require("./routes/userBlog")
const connectDB = require("./db/connect")


const express = require("express")
const NotFound = require("./middleware/not-found")
const ErrorHandlerMiddleware = require("./middleware/error-handler")
const AuthMiddleware = require("./middleware/authMiddleware")
const User = require("./models/User")
const app = express();
const cors = require("cors")


app.use(express.json())
app.use(cors())


app.get("/",async(req,res)=>{
    const users = await User.find({})
    res.status(200).json(users)
})
app.use("/api/v1/user",user)
app.use("/api/v1/blog",Blog)
app.use("/api/v1/user/blog",AuthMiddleware,userBlog)

app.use(NotFound)
app.use(ErrorHandlerMiddleware)


const PORT = process.env.PORT || 5000

const start = async ()=> {
  try {
    //Db Connect
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,console.log(`listening on port ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}
start()