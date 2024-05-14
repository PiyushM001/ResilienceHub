const express = require("express");
const router = express.Router();
const post = require("../schema/post");

// const team = require("../schema/team");

const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')
router.post(
  "/", fetchuser, async (req,res)=>{
  
    try {
      const userid = userfromtoken.id;
      const postinformation  =  await post.create({
          _userid:userid,
          IngameName:req.body.IngameName,
          RealName:req.body.RealName,
          description:req.body.description,
          photo:req.body.photo,
      })
      
      res.status(200).json(postinformation);
  
    } catch (error) {
      res.status(404).json("Internal server error");
      return;
    }
   


  }) 
  module.exports = router;