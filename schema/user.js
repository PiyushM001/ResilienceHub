const mongoose =require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    date:{
default:Date.now(),
type:Date
    }
});
module.exports = mongoose.model('students', userSchema);