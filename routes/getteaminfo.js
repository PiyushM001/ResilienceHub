

const express = require("express");
const router = express.Router();
const team = require("../schema/team");
const fetchuser = require('../middleware/fetchuser')
router.get(
  "/", fetchuser,  async (req,res)=>{

    try {
      const user = userfromtoken.id;
 const information = await team.find({_userid:user});
 if(!information){
  res.status(404).send("cant find info")
 }
   return res.send(information);
    } catch (error) {
      res.send(" something error ")
    }
  })
  module.exports = router;