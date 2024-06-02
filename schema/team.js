const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  _userid: {
    type: String,
    require: true,
  },
  teamname: { type: String, require: true },
  team: [{ type: Object, ref: "team" }],
  NotificationCount: {
    type: Number,
    default: 0,
  },
  inviteduser: [{ type: Object, ref: "team" }],
 invitinguser: [{ type: Object, ref: "team" }],

});
module.exports = mongoose.model("team", teamSchema);
