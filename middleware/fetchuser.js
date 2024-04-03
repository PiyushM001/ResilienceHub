const jwt = require("jsonwebtoken");
const jwtsecret = "piyush";
const fetchuser  = (req,res,next)=>{
const token = req.header('token');
if(!token){
    res.status(404).json("use valid token");
}
const verifytoken =  jwt.verify(token,jwtsecret);
userfromtoken = verifytoken.user;
next();
}
module.exports = fetchuser;