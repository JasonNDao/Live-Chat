const express=require("express");   //import express and name it express
const sockety=require("socket.io"); //import socket.io and name is sockety

const app=express();            //create app using express

app.use(express.static('public'));//use public folder for html etc

//SERVER
const server=app.listen(4000, function() {          //listen to port 4000, and if open, prints function, and allows connection to website
    console.log("Server started on port 4000")
})

//CONNECTION
const io=sockety(server); 

io.on('connection',(sockety)=>{                //creates connection on one end
    console.log("Somebody connected " + sockety.id);

    sockety.on('chat',(data)=>{          //when someone passes function called chat to server with data,                            
        io.sockets.emit('chat',data);    //pass it back to all clients
    })

    sockety.on('typing',(stuff)=>{       //when typing comes from client, broadcast to client (everyone sees besides person typing)
        sockety.broadcast.emit('typing',stuff);
    })
    sockety.on('typingnon',(stuff2)=>{       //when typing noncomes from client, broadcast to client (everyone sees besides person typing)
        sockety.broadcast.emit('typingnon',stuff2);
    })
})