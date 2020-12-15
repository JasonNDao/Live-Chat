const sockety=io.connect(); //client socket(need to change link when publishing website)

//get stuff on websites
var nameof=document.getElementById('name');
var message=document.getElementById('message');
const btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var cw=document.getElementById('chat-window');

btn.addEventListener("click",()=>{                //when clicked, emit a function called chat that sets message to message and name to nameof
    sockety.emit('chat',{                         //passes to server
        message:message.value,
        nameof:nameof.value
    })
    message.value="";                            //clears message after sending
})
message.addEventListener("focus",()=>{         //when there is a keypress in message box, pass name.value to server
    sockety.emit('typing',nameof.value);
    
})
message.addEventListener("blur",()=>{          //when no key is pressed, pass typingnon function to server 
    sockety.emit('typingnon',"");
})
sockety.on('chat',(data)=>{    
    output.innerHTML+= `<strong><p>${data.nameof}:</strong> ${data.message}</p> `        //when chat is passed back, add message to html of output
    cw.scrollTop=cw.scrollHeight;               //scroll to where your message is being sent
})
sockety.on('typing',(stuff)=>{
    feedback.innerHTML= `<p><em>${stuff} is typing...</em> </p> `        //when typing is passed back, put in feedback who is typing
})
sockety.on('typingnon',(stuff2)=>{
    feedback.innerHTML= `<p></p> `        //when typingnon is passed back, put in clear feedback
})