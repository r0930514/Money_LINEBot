'use strict';
const linebot = require('@line/bot-sdk');
const {GoogleSpreadsheet} = require('google-spreadsheet');
const express = require('express');
const { response } = require('express');
const config = require('./Token');
const client = new linebot.Client(config);
const app = express(); 

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
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null);
    }

    const echo = {type: 'text', text: "早安" };
    client.replyMessage(event.replyToken, echo);
    return;
}

const port = 3000;
app.listen(port, () =>{
    console.log(`listen on ${port}`);
    
})
