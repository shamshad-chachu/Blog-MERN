const {
  BadRequestError,
  UnAuthenticated,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Blog = require("../models/Blog");

// const getAll = async (req,res) =>{
//   const {search,category} =req.query
//   const queryObject = {}

//   if(search){
//     queryObject.$or = [
//       { title: { $regex: search, $options: 'i' } },
//       { des: { $regex: search, $options: 'i' } }
//        ]
//   }

//   if(category && category!=='All'){
//     queryObject.category = category
//   }

//   const blogs = await Blog.find(queryObject)
//   if(!blogs || blogs.length === 0){
//    return res.status(StatusCodes.OK).json({blogs:[],counts:blogs.length})
//   }

//   res.status(StatusCodes.OK).json({blogs,counts:blogs.length})
// }

const getAll = async (req, res) => {
  const { search, category, page = 1 } = req.query; // Default page to 1
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { des: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    queryObject.category = category;
  }

  const totalBlogs = await Blog.countDocuments(queryObject);

  const limit = 4;
  const skip = (parseInt(page) - 1) * limit;

  const blogs = await Blog.find(queryObject).limit(limit).skip(skip);

  res.status(StatusCodes.OK).json({ blogs, counts: totalBlogs });
};

// const getLatest = async (req, res) => {
//   const blogs = await Blog.find({}).sort("updatedAt").limit(10);
//   // console.log(blogs);
//   if (!blogs || blogs.length === 0) {
//     return res.status(StatusCodes.OK).json({ blogs: [], counts: blogs.length });
//   }
//   res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
// };

const getLatest = async (req, res) => {
  // 🌟 1. Category Filtering (Optional, based on frontend request)
  const { category } = req.query; 
  const queryObject = {};

  if (category && category !== "All") {
      queryObject.category = category;
  }

  try {
      // 🌟 2. Sort by 'createdAt' in descending order (-1) and limit to 3
      const blogs = await Blog.find(queryObject)
          .sort({ createdAt: -1 }) // Use createdAt for true latest, descending
          .limit(3); 
      
      if (!blogs || blogs.length === 0) {
          return res.status(200).json({ blogs: [], counts: 0 });
      }
      
      // Ensure you send the 'counts' field consistent with GetAllBlogs if needed, though for latest it's less crucial.
      res.status(200).json({ blogs, counts: blogs.length }); 
      
  } catch (error) {
      console.error("Error fetching latest blogs:", error);
      res.status(500).json({ msg: "Failed to fetch latest blogs" });
  }
};

const getById = async (req, res) => {
  const blogId = req.params.id;
  console.log(blogId);
  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      throw new NotFoundError(`No Blog Exists with id ${blogId}`);
    }
    res.status(StatusCodes.OK).json({ blog });
  } catch (error) {
    if (error.name === "CastError") {
      throw new NotFoundError(`${blogId} is not valid ID`);
    } else {
      throw error;
    }
  }
};

module.exports = {
  getAll,
  getById,
  getLatest,
};
