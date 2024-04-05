const mongoose = require('mongoose');
require('dotenv').config();
const dburl = process.env.dburl
// dburl2 ="mongodb+srv://piyush:piyush101010@cluster0.qx41var.mongodb.net/"
const connectdb=()=>{
    mongoose.connect(dburl,console.log("database connected successfully")
    )
}
module.exports = connectdb;