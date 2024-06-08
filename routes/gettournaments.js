const express = require("express");
const router = express.Router();
const tournament = require("../schema/tournament");
const fetchuser = require('../middleware/fetchuser')
const info = require("../schema/info");

router.post(
  "/",   async (req,res)=>{

    try {
    
 const information = await tournament.find();
 if(!information){
 return res.status(404).send("cant find info")
 }
     return res.status(200).send(information);
    } catch (error) {
      res.send(" something error ")
    }
 

  })


  router.post(
    "/detail",   async (req,res)=>{
  
      try {
      
   const information = await tournament.findById(req.body._id);
   if(!information){
   return res.status(404).send("cant find info")
   }
       return res.status(200).send(information);
      } catch (error) {
        res.send(" something error ")
      }
   
  
    })
    router.post(
      "/register",fetchuser,async (req,res)=>{
       
        try {
          const userid = userfromtoken.id;
          
     const information = await info.findOne({user:userid});
   
     if(!information){
      return res.status(404).send("cant find info")
      }
     if(!information.playerid){
      return res.status(404).send("Complete your Profile,Fill your Playerid")
     }
     if(!information.contact1){
      return res.status(404).send("Complete your Profile,Fill your Email")
     }
     if(!information.device){
      return res.status(404).send("Complete your Profile,Fill your Device")
     }

     if(!information.contact2){
      return res.status(404).send("Complete your Profile,Fill your Phone Number")
     }
     if(!information.education){
      return res.status(404).send("Complete your Profile,Fill your Education")
     }
     if(!information.location){
      return res.status(404).send("Complete your Profile,Fill your location")
     }
     
     const informationcheck = await tournament.findById(req.body._id)

     if (informationcheck.registered.some(follower => follower.user === userid)) {
      res.status(400).send("Already Registered")
      return
  }



       const information2 = await tournament.findByIdAndUpdate(req.body._id,{
        $push: { registered: information },
        $inc: { registrationcount: 1 },
      }
    );



    
         return res.status(200).send(" Registration Successful ");
        } catch (error) {
          res.send(" something went wrong ")
        }
     
    
      })
  module.exports = router;