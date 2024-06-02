const express = require("express");
const router = express.Router();
const info = require("../schema/info");
const chatdb = require("../schema/chat");

// const team = require("../schema/team");




router.post(
  "/", async (req,res)=>{
  
const {teamname,userRealName,userId,time ,message}= req.body;
const chatobj  = {
    userId:userId,
    userRealName:userRealName,
    time:time,
    message:message

}
  if(message != ""){
    try {
     
        await chatdb.findOneAndUpdate({group:teamname}, {
            $push: {chat:chatobj }       
          });
          
          io.to(teamname).emit("newMessage", chatobj);
     return res.status(200).json("msg sent");
  
    } catch (error) {
      res.status(404).json("Internal server error");
      return;
    }
   
  }else{
    return res.status(200).json("msg was empty");

  }

  })
  module.exports = router;