const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
    group:{
        type:String,
        unique:true
    },
 
  chat: [{ type: Object, ref: "team" }],

  time:{
    default:Date.now(),
    type:Date
        }


});
module.exports = mongoose.model("chats", chatSchema);
