const mongoose = require('mongoose');
require('dotenv').config();
const dburl = process.env.dburl
// dburl2 ="mongodb+srv://piyush:piyush101010@cluster0.qx41var.mongodb.net/"
const connectdb=()=>{
    mongoose.connect('mongodb+srv://pmimpiyush:YO9SEiF8Y3t5S0OV@cluster0.eyxki.mongodb.net/',console.log("database connected successfully")
    )
}
module.exports = connectdb;