const express = require("express")
const { getAll, getLatest, getById } = require("../controllers/blog")
const router = express.Router()


router.get("/",getAll)
router.get("/latest",getLatest)
router.get("/:id",getById)

module.exports = router