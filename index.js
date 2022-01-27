const linebot = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');
const app = express(); 

//env vars 
const config = {
    "channelId" : process.env.channelId,
    "channelSecret" : process.env.channelSecret,
    "channelAccessToken" : process.env.channelAccessToken
};

//create a bot
const client = new linebot.Client(config);


app.post('/callback', linebot.middleware(config), (req, res)=>{
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result)=> res.json(result))
    .catch((err)=>{
        console.error(err);
        res.status(500).end();
    });
})


function handleEvent(event){
    console.log(event);
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null);
    }

    const echo = {type: 'text', text: event.message.text };
    client.replyMessage(event.replyToken, echo);
    return;
}

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`正在${port}監視`);
})
