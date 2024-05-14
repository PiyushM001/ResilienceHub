const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  _userid: {
    type: String,
    require: true,
  },
 
  
  IngameName:{
    type:String,
   require:true
},
RealName:{
    type:String,
    require:true

},
description: { type: String, require: true },
Photo: {
    type:Buffer,
    
  }



});
module.exports = mongoose.model("post", PostSchema);
