const express = require("express");
const router = express.Router();
const info = require("../schema/info");
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')
router.post(
  "/", fetchuser,  [  body("RealName","Name should be longer1").isLength({ min:1}),body("IngameName","Name should be longer2").isLength({ min:1}),body("game","Name should be longer").isLength({ min:1})], async (req,res)=>{
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.send({ errors: result.array() });
    // }

    const result = validationResult(req);
    if (!result.isEmpty()) {
const resultarray = result.array();
      return res.status(404).json(resultarray[0].msg);
    }



    try {
      const userid = userfromtoken.id;
      const infomation  =  await info.create({
          user:userid,
          IngameName:req.body.IngameName,
          RealName:req.body.RealName,
          game:req.body.game,
          device:req.body.device,
          text:req.body.text,
          playerid:req.body.playerid,

      })
      res.status(200).json(infomation);
  
    } catch (error) {
      res.status(404).json("Internal server error");
      return;
    }
   


  })
  module.exports = router;