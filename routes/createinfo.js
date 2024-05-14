const express = require("express");
const router = express.Router();
const info = require("../schema/info");
const team = require("../schema/team");

// const team = require("../schema/team");

const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')
router.post(
  "/", fetchuser,  [  body("RealName","Name should be longer1").isLength({ min:1}),body("IngameName","Name should be longer2").isLength({ min:1}),body("game","Name should be longer").isLength({ min:1})], async (req,res)=>{
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.send({ errors: result.array() });
    // }
    const userid = userfromtoken.id;

    const result = validationResult(req);
    if (!result.isEmpty()) {
const resultarray = result.array();
      return res.status(404).json(resultarray[0].msg);
    }

    const check = await info.findOne({user:userid});
    if (check) {
      res.status(404).json("info already updated");
      return;
    }

    try {
     
      const infomation  =  await info.create({
          user:userid,
          IngameName:req.body.IngameName,
          RealName:req.body.RealName,
          game:req.body.game,
          device:req.body.device,
          text:req.body.text,
          playerid:req.body.playerid,

      })
      const teaminfo  =  await team.create({
        _userid:userid,
        teamname:req.body.teamname

    })
     return res.status(200).json(infomation);
  
    } catch (error) {
      res.status(404).json("Internal server error");
      return;
    }
   


  })
  module.exports = router;