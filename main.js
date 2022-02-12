//匯入函式庫
const linebot = require('@line/bot-sdk');
const express = require('express');
const dataapi = require('./lib/api')
const date = require('./lib/time');
const config = require('./lib/config')



//create a bot
const client = new linebot.Client(config);

//define express app
const app = express(); 
app.use('/static', express.static(__dirname+'/website'))
app.use(express.json());
app.use('/api', dataapi)



//監聽webhook事件並執行相關動作
app.post('/callback', linebot.middleware(config), (req, res)=>{
    req.body.events.map((event)=>{
        handleEvent(event);
    })
    res.sendStatus(200);
})



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
