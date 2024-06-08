const mongoose =require('mongoose');
const { Schema } = mongoose;

const tournamentSchema = new Schema({
    org:{
        type:String,
    },
    orgimg:{
        type:String,
    },
    description:{
        type:String,
    },
    entryfee:{
        type:String,
    },
    prizepool:{
        type:String,
    },
    registrationcount:{
        type:Number,
        default: 13
    },
    registered:[{ type: Object, ref: "team" }],
    time:{
        type:String,
    },
    game:{
        type:String,
    },
    solo:{
        type:String,
    },
    map:{
        type:String,
        },
    info:{
        type:String,
        },
    date:{
default:Date.now(),
type:Date
    }
});
module.exports = mongoose.model('tournament', tournamentSchema);
// id:"0",
// org:"MAT- I ",
// orgimg:{orgimg},
// description:"MyAllies Official Tournament",
// entryfee:"Register",
// prizepool:"5k",
// registrations:"67",
// time:"5 days left",
// game:"BGMI",
// solo:"Solo",
// map:"Erangle",
// info:"info"
// },