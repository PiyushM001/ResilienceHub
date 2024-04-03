const express = require("express");
const router = express.Router();
const info = require("../schema/info");
router.post(
  "/",  async (req,res)=>{
    const { _id } = req.body;

    try {
 const playerinfo = await info.findOne({_id});
 if(!playerinfo){
  res.status(404).send("cant find info");
  return;
 }
 res.status(200).send(playerinfo);

    } catch (error) {
      res.status(500).send(" something error ")
      return;
    }
 

  })
  module.exports = router;