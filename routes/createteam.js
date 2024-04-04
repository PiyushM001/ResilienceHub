const express = require("express");
const router = express.Router();
const team = require("../schema/team");
// const team = require("../schema/team");

const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');
router.post(
  "/", fetchuser, async (req,res)=>{
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.send({ errors: result.array() });
    // }

//     const result = validationResult(req);
//     if (!result.isEmpty()) {
// const resultarray = result.array();
//       return res.status(404).json(resultarray[0].msg);
//     }



    try {
      const userid = userfromtoken.id;
      const teaminfo  =  await team.create({
          user:userid,
          teamname:req.body.teamname

      })
   
      res.status(200).json(teaminfo);
  
    } catch (error) {
      res.status(404).json("Internal server error");
      return;
    }
   


  })
  module.exports = router;