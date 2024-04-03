
const express = require("express");
const router = express.Router();
const info = require("../schema/info");
router.get(
  "/",  async (req,res)=>{
    const __v=0;
    try {
        const players = await info.find({ __v });
                 res.status(200).send(players)
                 return;
            
            } catch (error) {
                res.status(500).send("server me dikkat h b0$$")
                return;
            }

  })
  module.exports = router;





















// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const fetchuser = require('../middleware/fetchuser')
// const students = require("../schema/user");
 
// router.get('/', async (req,res)=>{
// const __v=0; 
//     try {
        
//         const student = await students.find({ __v });
//          res.status(200).send(student)
//          return;
    
//     } catch (error) {
//         res.status(500).send("server me dikkat h b0$$")
//         return;
//     }
       



    

// })
// module.exports=router




// try {
//     userID = userfromtoken.id;
//     const student = await students.findById(userID);
//      res.send(student)

// } catch (error) {
//     res.send("server me dikkat h b0$$")
// }
   