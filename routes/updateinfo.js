const express = require("express");
const router = express.Router();

const info = require("../schema/info");
const fetchuser = require('../middleware/fetchuser')

router.put('/', fetchuser, async (req, res) => {
    const { about,contact1,contact2,text,education , skill1, skill2, skill3, playerid, location, tournament1, tournament2,  infoid} = req.body;
    try {
        // Create a newNote object
        const newinfo = {};
        // if (IngameName) { newinfo.IngameName =IngameName };
        // if (RealName) { newinfo.RealName = RealName };
        // if (game) { newinfo.game = game };
        if (about) { newinfo.about = about };
        if (contact1) { newinfo.contact1 =contact1 };
        if (contact2) { newinfo.contact2 = contact2 };
        if (text) { newinfo.text = text };
        if (education) { newinfo.education = education };
        if (skill1) { newinfo.skill1 = skill1 };
        if (skill2) { newinfo.skill2 = skill2 };
        if (skill3) { newinfo.skill3 = skill3 };
        if (playerid) { newinfo.playerid = playerid };
        if (location) { newinfo.location = location };

        if (tournament1) { newinfo.tournament1 = tournament1};
        if (tournament2) { newinfo.tournament2 =tournament2 };

        
  
        // Find the note to be updated and update it
        let information = await info.findById(infoid);
        if (!information) { return res.status(400).json("Not Found") }
  
        if (information.user.toString() !== userfromtoken.id) {
            return res.status(400).json("Not Allowed");
        }
        information = await info.findByIdAndUpdate(infoid, { $set: newinfo }, { new: true })
        res.json({ information });
    } catch (error) {
        console.error(error.message);
        res.status(400).json("Internal Server Error");
        return;
    }
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
//       let information = await info.findById(req.params.id);
//       if (!information) { return res.status(text0text).send("Not Found") }

//       if (information.user.toString() !== userfromtoken.id) {
//           return res.status(text0).send("Not Allowed");
//       }
//       information = await info.findByIdAndUpdate(req.params.id, { $set: newinfo }, { new: true })
//       res.json({ information });
//   } catch (error) {
//       console.error(error.message);
//       res.status(education00).send("Internal Server Error");
//   }
// })