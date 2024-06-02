const mongoose = require("mongoose");
const { Schema } = mongoose;

const infoSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  IngameName: {
    type: String,
    require: true,
  },
  RealName: {
    type: String,
    require: true,
  },
  team: [{ type: Object, ref: "info" }],

  followers: [{ type: Object, ref: "info" }],
  followersCount: {
    type: Number,
    default: 0,
  },

  followingCount: {
    type: Number,
    default: 0,
  },

  following: [{ type: Object, ref: "info" }],

  game: {
    type: String,
    require: true,
  },
  device: {
    type: String,
  },
  text: {
    type: String,
  },
  playerid: {
    type: String,
  },
  about: {
    type: String,
  },
  contact1: {
    type: String,
  },
  contact2: {
    type: String,
  },
  education: {
    type: String,
  },
  skill2: [{ type: Object, ref: "info" }],


  location: {
    type: String,
  },
  tournament2: [{ type: Object, ref: "info" }],

  profilePicture: String,
  profilePictureUrl: String,
  bgPicture: String,
  bgPictureUrl: String,
});
module.exports = mongoose.model("info", infoSchema);
