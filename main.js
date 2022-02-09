//匯入函式庫
const linebot = require('@line/bot-sdk');
const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const database = require('./lib/database');
const date = require('./lib/time');

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
app.use('/static', express.static(__dirname+'/website'))
app.use(express.json());

//database init
const connection = mysql.createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database ,
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

//data api (restful api)
app.get('/api/data', async(req, res)=>{
    result = await database.searchall(connection)
    console.log(result)
    res.json(result);
})
app.delete('/api/data/:id', async(req,res)=>{
    result = await database.removeitem(req.params.id, connection)
    res.sendStatus(200);
})
app.post('/api/data', async(req, res)=>{
    result = await database.additem(req.body, connection)
    res.sendStatus(200); 
    
})
//data api (other action)
app.delete('/api/data/other/all', async(req, res)=>{
    result = await database.clearing(connection)
    res.sendStatus(200);
})//刪除所有資料

//管理界面
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/website/index.html')
});



//當事件被觸發的動作
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
