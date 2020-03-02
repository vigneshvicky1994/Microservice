const express = require('express');
const amqp = require('amqplib/callback_api');

var app = express();
const port = 2001;

amqp.connect('amqp://localhost', (err,conn) => {
    conn.createChannel((err,ch) => {
        var queue = 'FirstQueue';
        ch.assertQueue(queue, {durable:false});
        console.log("wait for the message");
        ch.consume(queue,(message)=>{
            console.log("Received" + message.content);
        });
    })
})

app.listen(port,() => {
    console.log("Sample Service Running on port " + port);
});
