//匯入函式庫
const linebot = require('@line/bot-sdk');
const express = require('express');
const dataapi = require('./lib/api')
const config = require('./lib/config')
const flex1 = require('./lib/flex_message/flex1')
const axios = require('axios')
const time = require("./lib/time")
//create a bot
const client = new linebot.Client(config);

//define express app
const app = express(); 
app.use('/static', express.static(__dirname+'/website'))
app.use('/api', dataapi)


//監聽webhook事件並執行相關動作
app.post('/callback', linebot.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  });
  
  // event handler
  async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
    let echo = {type: 'text', text: ''} 
    // create a echoing text message
    switch(event.message.text){
    case "早餐":
        await axios.post(`http://localhost:${process.env.PORT || 3000}/api/data`, {
          name: "早餐",
          date: time.getNowDate(),
          price: 50
        })
        return client.replyMessage(event.replyToken, flex1)
    case "中餐":
        await axios.post(`http://localhost:${process.env.PORT || 3000}/api/data`, {
          name: "中餐",
          date: time.getNowDate(),
          price: 100
        })
        return client.replyMessage(event.replyToken, flex1)
    case "晚餐":
        await axios.post(`http://localhost:${process.env.PORT || 3000}/api/data`, {
          name: "晚餐",
          date: time.getNowDate(),
          price: 100
        })   
        return client.replyMessage(event.replyToken, flex1)
    case "help":
        echo = {type: 'text', text: `
                輸入 早/中/晚餐：
                    即可對應到加入50元/100元/100元的項目
                快速新增一個項目：
                    “價錢”（“新增項目名稱”
                    範例：
                        100（吃飯


            `}
    default:
        echo = { type: 'text', text: "不明" };
        return client.replyMessage(event.replyToken, echo)

    }
    // use reply API

  }
  



//管理界面
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/website/index.html')
});



//在port監聽
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`正在${port}監視`);
})
