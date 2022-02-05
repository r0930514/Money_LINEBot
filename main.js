const linebot = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');
const mysql = require('mysql')
const database = require('./lib/database');

//local test or env vars
var config = [];
if(process.env.channelId == undefined){
    const rawdata = fs.readFileSync('Token.json');
    config = JSON.parse(rawdata);
}else{
    config = {
        "channelId" : process.env.channelId ,
        "channelSecret" : process.env.channelSecret,
        "channelAccessToken" : process.env.channelAccessToken,
        "host" : process.env.host,
        "user" : process.env.user,
        "password" : process.env.password,
        "database" : process.env.database 
    };
}
//create a bot
const client = new linebot.Client(config);

//define express app
const app = express(); 


//database init
const connection = mysql.createPool({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'baee9dc10602da',
    password : '71937b50',
    database : 'heroku_ae03ac8b1add904' ,
    charset : 'utf8mb4'
}); 
connection.on('error', (err)=>{
    console.log(err.code)
    connection.connect();
})

//監聽webhook事件並執行相關動作
app.post('/callback', linebot.middleware(config), (req, res)=>{
    req.body.events.map((event)=>{
        handleEvent(event);
    })
    res.sendStatus(200);
})

//管理界面
app.get('/',(req,res)=>{
	//res.send("<h1>早安<h1/>");
    database.searchall(connection,(result)=>{
        console.log(result)
        var sendData=``;
        for(i=0;i<result.length;i++){
            sendData+=`<p>${result[i]['id']} ${result[i]['name']}<p/>`
        }
        res.send(sendData);
    });
});

//behavior
function handleEvent(event){
    if(event.type !== 'message' || event.message.type !== 'text'){
        return null;
    }

    const echo = {type: 'text', text: event.message.text };
    client.replyMessage(event.replyToken, echo);
    return;
}

//在port監聽
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`正在${port}監視`);
})
