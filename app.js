const express = require('express');
const app=express();
var cors = require('cors')
 app.use(cors())
const connectdb = require('./db');
const port = 5000;
connectdb();

app.use(express.json());
app.use('/login', require('./routes/login'));
app.use('/signin', require('./routes/signin'));
app.use('/getplayers', require('./routes/getplayers'));
app.use('/createinfo', require('./routes/createinfo'));
app.use('/getinfo', require('./routes/getinfo'));
app.use('/updateinfo', require('./routes/updateinfo'));
app.use('/deleteinfo', require('./routes/deleteinfo'));
app.use('/getplayerinfo', require('./routes/getplayerinfo'));
app.use('/follow', require('./routes/follow'));
app.use('/invite', require('./routes/invite'));
app.use('/team', require('./routes/team'));
app.use('/createteam', require('./routes/createteam'));
app.use('/getnotification', require('./routes/getnotification'));





app.listen(port, ()=>{
    console.log('server listning at port 5000')

})