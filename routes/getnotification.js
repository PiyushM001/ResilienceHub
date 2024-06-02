const express = require("express");
const router = express.Router();
const team = require("../schema/team");
const fetchuser = require('../middleware/fetchuser')
router.get(
  "/", fetchuser,  async (req,res)=>{

    try {
      const _userid = userfromtoken.id;
 const notification = await team.find({_userid});


 if(!notification){
  res.status(404).send("cant find team")
  return
 }
 res.status(200).json(notification);
 return
    } catch (error) {
      res.send(" something error ")
    }
  })
  module.exports = router;