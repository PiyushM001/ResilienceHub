const express = require("express");
const router = express.Router();
const team = require("../schema/team");
const chatdb = require("../schema/chat");

// const team = require("../schema/team");

const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');


router.post('/', fetchuser, async (req, res) => {

  const {teamname}= req.body;
  // const {  userRealName,userId,time,msg }= req.body;

const chat  = {
    userId:" ",
    userRealName:" ",
    userId:" ",
    time:" ",
    message: "Start a chat with your TeamMates",

}
  try {
      // Create a newNote object
      const newinfo = {};
      const userid = userfromtoken.id;
      // if (IngameName) { newinfo.IngameName =IngameName };
      // if (RealName) { newinfo.RealName = RealName };
      // if (game) { newinfo.game = game };
      if (teamname) { newinfo.teamname = teamname };
      

      const chats  =  await chatdb.create({
        group:teamname,
        chat:chat

    })
      // Find the note to be updated and update it

      let information = await team.findOne({_userid:userid})

       information = await team.findOneAndUpdate( {_userid:userid}, { $set: newinfo }, { new: true })
      res.json({ information });
  } catch (error) {
      console.error(error.message);
      res.status(400).json("Internal Server Error");
      return;
  }
})
  module.exports = router;



  