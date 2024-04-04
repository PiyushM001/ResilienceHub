const express = require("express");
const router = express.Router();

const team = require("../schema/team");
const fetchuser = require('../middleware/fetchuser')

router.put('/', fetchuser, async (req, res) => {
    //user 1 is the person who is following others
    //user  is the id which is being followe by person 1 
    const { _userid } = req.body;
    const user1 = userfromtoken.id;
    const user = await team.findOne({_userid});
    const userp = {id:user1,followerRealName:req.body.followerRealName,followerIngameName:req.body.followerIngameName}
    const userm = {id:req.body._userid,RealName:req.body.RealName,IngameName:req.body.IngameName}

    if (!user) {
        res.status(404).send("can't find user")
        return
    }
  
    // make the sure the user is not the logged in user
    if (req.body._id ===user1) {
        res.status(400).send("cant invite yourself")
        return
    }
    // user.followers.some(follower => follower.id === userp.id)
    // only follow if the user is not following already
    if (user.team.some(teammate => teammate.id === user1)) {
        res.status(400).send("already in team")
        return
    }
 
    await team.findOneAndUpdate({_userid:_userid}, {
      $push: { invitinguser: userp },
    });
    await team.findOneAndUpdate({_userid:user1}, {
      $push: { inviteduser: userm },
    });
  
    res.status(200).send("invitation sent")
    return
  })
  

  module.exports=router














  // router.put('/update/:id', fetchuser, async (req, res) => {
//   const { title, text} = req.body;
//   try {
//       // Create a newNote object
//       const newteam = {};
//       if (title) { newteam.title = title };
//       if (text) { newteam.text = text };
      

//       // Find the note to be updated and update it
//       let teamrmation = await team.findById(req.body._id);
//       if (!teamrmation) { return res.status(404).send("Not Found") }

//       if (teamrmation.user.toString() !== userfromtoken.id) {
//           return res.status(401).send("Not Allowed");
//       }
//       teamrmation = await team.findByIdAndUpdate(req.body._id, { $set: newteam }, { new: true })
//       res.json({ teamrmation });
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// })