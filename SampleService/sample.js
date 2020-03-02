const express = require('express');
const amqp = require('amqplib/callback_api');

var app = express();
const port = 3001;



app.listen(port,() => {
    console.log("Sample Service Running on port " + port);
});

app.get('/',(req,res)=>{
    amqp.connect('amqp://localhost', (err,conn) => {
    conn.createChannel((err,ch) => {
        var queue = 'FirstQueue';
        var mesage = { type: '2' , content : 'hello rabbit'};
        ch.assertQueue(queue, {durable:false});
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(mesage)));
        console.log("Message Sent");
        setTimeout(()=>{
            conn.close();
            process.exit(0);
        },500);
    });
    });
    res.send("response sent");
});
