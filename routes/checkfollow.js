const express = require("express");
const router = express.Router();

const info = require("../schema/info");
const fetchuser = require('../middleware/fetchuser')

router.put('/', fetchuser, async (req, res) => {
    //user 1 is the person who is following others
    //user  is the id which is being followe by person 1 

    const user1 = userfromtoken.id;
    const user = await info.findById(req.body._id);
   
    if (!user) {
        res.status(404).send("cant find user")
        return
    }
  
    // make the sure the user is not the logged in user

    // user.followers.some(follower => follower.id === userp.id)
    // only follow if the user is not following already
    if (user.followers.some(follower => follower.id === user1)) {
        res.status(200).send("following")
        return
    }
  
    res.status(200).send("follow")
    return
  })
  

  module.exports=router














  // router.put('/update/:id', fetchuser, async (req, res) => {
//   const { title, text} = req.body;
//   try {
//       // Create a newNote object
//       const newinfo = {};
//       if (title) { newinfo.title = title };
//       if (text) { newinfo.text = text };
      

//       // Find the note to be updated and update it
//       let information = await info.findById(req.body._id);
//       if (!information) { return res.status(404).send("Not Found") }

//       if (information.user.toString() !== userfromtoken.id) {
//           return res.status(401).send("Not Allowed");
//       }
//       information = await info.findByIdAndUpdate(req.body._id, { $set: newinfo }, { new: true })
//       res.json({ information });
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// })