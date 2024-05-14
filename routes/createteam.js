const express = require("express");
const router = express.Router();
const team = require("../schema/team");
// const team = require("../schema/team");

const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');
// router.post(
//   "/", fetchuser, async (req,res)=>{
//     // const result = validationResult(req);
//     // if (!result.isEmpty()) {
//     //   return res.send({ errors: result.array() });
//     // }

// //     const result = validationResult(req);
// //     if (!result.isEmpty()) {
// // const resultarray = result.array();
// //       return res.status(404).json(resultarray[0].msg);
// //     }



//     try {
//       const userid = userfromtoken.id;
//       const teaminfo  =  await team.create({
//         _userid:userid,
//           teamname:req.body.teamname

//       })
   
//       res.status(200).json(teaminfo);
  
//     } catch (error) {
//       res.status(404).json("Internal server error");
//       return;
//     }
   


//   })

router.put('/', fetchuser, async (req, res) => {
  const { teamname } = req.body;
  try {
      // Create a newNote object
      const newinfo = {};
      const userid = userfromtoken.id;
      // if (IngameName) { newinfo.IngameName =IngameName };
      // if (RealName) { newinfo.RealName = RealName };
      // if (game) { newinfo.game = game };
      if (teamname) { newinfo.teamname = teamname };
      
      // Find the note to be updated and update it
      let information = await team.findOne({_userid:userid})
      // if (!information) { return res.status(400).json("not found") }

      // if (information.user.toString() !== userfromtoken.id) {
      //     return res.status(400).json(information.user);
      // }
       information = await team.findOneAndUpdate( {_userid:userid}, { $set: newinfo }, { new: true })
      res.json({ information });
  } catch (error) {
      console.error(error.message);
      res.status(400).json("Internal Server Error");
      return;
  }
})
  module.exports = router;



  