const { default: mongoose } = require("mongoose")
const mongoos = require("mongoose")

const BlogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"provide the title for blog"],
    minlength:5,
  },
  des:{
    type:String,
    required:[true,"please provide description"]
  },
  category:{
    type:String,
    enum:["Technology","Programming","Design","Lifestyle","Career"],
    required: [true, "Please select a category for the blog"]
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,"please provide user"]
  },
  Author:{
    type:String,
    required:[true,"please provide Author"]
  }
},{timestamps:true})

module.exports = mongoos.model('Blog',BlogSchema)


/*
{
  "_id": "69298f7dc35e3fded8bfacc0",
  "title": "GGGGGGGG",
  "des": "xvhvxhjbsxsxj",
  "category": "programming",
  "createdBy": "6928222be6e81bb777efcc95",
  "Author": "chachu",
  "createdAt": "2025-11-28T12:03:09.454Z",
  "updatedAt": "2025-11-28T12:03:09.454Z",
  "__v": 0
}
   */