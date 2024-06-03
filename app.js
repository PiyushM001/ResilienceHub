const express = require('express');
const app=express();
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const socketIo = require("socket.io");
const chatdb =require('./schema/chat')
require('dotenv').config();
const port = process.env.PORT || 5000
var cors = require('cors')

 app.use(cors())

const connectdb = require('./db');

connectdb();


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("New client connected");

  // Join the room for this user's team
  socket.on("joinRoom", (teamname) => {
    socket.join(teamname);
    console.log(`User joined room: ${teamname}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async (messageData) => {
    const { teamname, userRealName, userId, time, message } = messageData;

    const chatobj = {
      userId: userId,
      userRealName: userRealName,
      time: time,
      message: message
    };

    if (message !== "") {
      try {
        await chatdb.findOneAndUpdate(
          { group: teamname },
          { $push: { chat: chatobj } },
          { new: true, upsert: true }
        );

        
        io.to(teamname).emit("newMessage", chatobj); // Emit the new message to all users in the room
      } catch (error) {
        console.error("Internal server error:", error);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});







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
app.use('/team', require('./routes/acceptinvite'));
app.use('/ignoreinvite', require('./routes/ignoreinvite'));
app.use('/chat', require('./routes/chatting'));
app.use('/getChats', require('./routes/getChats'));
app.use('/cloud',require('./routes/cloud'));
app.use('/getteaminfo', require('./routes/getteaminfo'));
app.use('/getposts', require('./routes/getpost.js'));
app.use('/like', require('./routes/like.js'));

app.use('/createteam', require('./routes/createteam'));
app.use('/getnotification', require('./routes/getnotification'));
app.use('/checkfollow', require('./routes/checkfollow'));
app.use('/post', require('./routes/post'));




server.listen(port, ()=>{
    console.log('server listning at port 5000')

})