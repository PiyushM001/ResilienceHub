const express = require("express");
const router = express.Router();

const info = require("../schema/info");
const fetchuser = require('../middleware/fetchuser')


router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let information = await info.findById(req.params.id);
        if (!information) { return res.status(404).send("Not Found") }
  
        // Allow deletion only if user owns this Note
        if (information.user.toString() !== userfromtoken.id) {
            return res.status(401).send("Not Allowed");
        }
  
        information = await info.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", information: information });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })
  
  
 
  
    module.exports=router