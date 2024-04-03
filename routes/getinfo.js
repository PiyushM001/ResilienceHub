const express = require("express");
const router = express.Router();
const info = require("../schema/info");
const fetchuser = require('../middleware/fetchuser')
router.get(
  "/", fetchuser,  async (req,res)=>{

    try {
      const user = userfromtoken.id;
 const information = await info.find({user});
 if(!information){
  res.status(404).send("cant find info")
 }
 res.send(information);
    } catch (error) {
      res.send(" something error ")
    }
 

  })
  module.exports = router;