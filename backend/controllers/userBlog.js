const { StatusCodes } = require("http-status-codes")
const Blog = require("../models/Blog")
const { NotFoundError, BadRequestError } = require("../errors")

const getAllBlogs = async (req,res) => {
  const{userId} = req.user
  const blogs = await Blog.find({createdBy:userId})
  res.status(StatusCodes.OK).json({blogs,count:blogs.length})
}

const getBlog = async (req,res) => {

  const {
    user:{userId},
    params:{id:blogId}
      } = req
  const blog = await Blog.findOne({_id:blogId,createdBy:userId})
  if(!blog){
    throw new NotFoundError(`no Blog with id ${blogId}`)
  }
  res.status(StatusCodes.OK).json({blog})
}

const createBlog = async (req,res) => {
  req.body.createdBy = req.user.userId
  req.body.Author = req.user.name
  const blog = await Blog.create(req.body)
  res.status(StatusCodes.CREATED).json({blog})
}

const updateBlog = async (req,res) => {
  const{
    body:{title,des,category},
    user:{userId},
    params:{id:blogId}
  } = req

  if(title === '' || des ==='' || category===''){
    throw new BadRequestError("title, des , category , fields cannot be empty")
  }
  const blog = await Blog.findByIdAndUpdate({_id:blogId,createdBy:userId},req.body,{new:true,runValidators:true})

  if(!blog){
    throw new NotFoundError(`no blog with id ${blogId}`)
  }

  res.status(StatusCodes.OK).json({blog})
}

const deleteBlog = async (req,res) => {
  const {
    user:{userId},
    params:{id:blogId}
      } = req
  
  const blog = await Blog.findByIdAndDelete({_id:blogId,createdBy:userId})
  if(!blog){
    throw new NotFoundError(`no blog with id ${blogId}`)
  }   
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllBlogs,getBlog,createBlog,updateBlog,deleteBlog,
}


