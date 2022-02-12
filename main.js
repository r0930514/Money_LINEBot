//匯入函式庫
const linebot = require('@line/bot-sdk');
const express = require('express');
const dataapi = require('./lib/api')
const config = require('./lib/config')

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
  function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
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
