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

PostUrl: String,
profilephoto: String,
likesCount: {
  type: Number,
  default: 0,
},

LikedBy: [{ type: Object, ref: "info" }],
date:{
  default:Date.now(),
  type:Date
      }

});
module.exports = mongoose.model("post", PostSchema);
