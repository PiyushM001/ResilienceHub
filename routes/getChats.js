const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const team = require("../schema/team");

const chatdb = require("../schema/chat");


router.get("/", fetchuser, async (req, res) => {
  const user = userfromtoken.id;
  const information = await team.findOne({_userid:user});
if(!information){
res.status(404).send("cant find info")
}
 
  const  teamname = information.teamname; 
  try {
    const chatinfo = await chatdb.find({ group: teamname });

    if (!chatinfo) {
      res.status(404).send("cant find chats");
    }

    return res.status(200).send({chatinfo:chatinfo,information:information});
  } catch (error) {
    res.send(" something error ");
  }
});
module.exports = router;
