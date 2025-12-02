const express = require("express")
const router = express.Router()
const{getAllBlogs,getBlog,createBlog,updateBlog,deleteBlog} = require("../controllers/userBlog")

router.route("/").get(getAllBlogs).post(createBlog)
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog)

module.exports = router