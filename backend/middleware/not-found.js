const NotFound= (req,res)=>{
  return res.status(404).send("no route Exists")
}

module.exports = NotFound