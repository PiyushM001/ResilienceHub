const mongoose = require('mongoose');

const  dburl = "mongodb+srv://pmimpiyush:piyush26262525@cluster0.lie13rx.mongodb.net/"
const dburl2 = "mongodb+srv://piyush:piyush101010@cluster0.qx41var.mongodb.net/"
const connectdb=()=>{
    mongoose.connect(dburl2,console.log("database connected successfully")
    )
}
module.exports = connectdb;