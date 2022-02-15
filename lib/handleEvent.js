// event handler
const addDetails = require('./flex_message/addDetails')
const errormsg = require('./flex_message/errormsg')
const removeDetails = require('./flex_message/removeDetails')
const database = require('./database')
const time = require("./time")
const linebot = require('@line/bot-sdk');
const client = new linebot.Client(config);
const commandHelp = 
`🔵早餐(快速選單)
- 新增當天的早餐50元

🔵中餐(快速選單)
- 新增當天的中餐100元

🔵晚餐(快速選單)
- 新增當天的晚餐100元

🔵快速新增一個項目：
- “價錢”（“新增項目名稱”
- 範例：100（吃飯`
const errorText = 
`請輸入對應的指令
輸入"說明"可以查詢指令
`

async function handleEvent(event) {
    let echo = {type: 'text', text: ''} 
    console.log(event)
    if (event.type !== 'message' || event.message.type !== 'text') {
        if(event.type == 'postback'){
            console.log(event.postback.data);
            database.removeitem(event.postback.data)
            echo = {type: 'text', text: "完成"}
            return client.replyMessage(event.replyToken, echo)
        }
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    
    // create a echoing text message
    switch(event.message.text){
    case "早餐":
        await database.additem({
            name: "早餐",
            date: time.getNowDate(),
            price: 50
          })
        return client.replyMessage(event.replyToken, addDetails("早餐", 50))
    case "中餐":
        await database.additem({
            name: "中餐",
            date: time.getNowDate(),
            price: 100
          })
        return client.replyMessage(event.replyToken, addDetails("中餐", 100))
    case "晚餐":
        await database.additem({
            name: "晚餐",
            date: time.getNowDate(),
            price: 100
          }) 
        return client.replyMessage(event.replyToken, addDetails("晚餐", 100))
    case "說明":
        echo = {type: 'text', 
        text: commandHelp
        }
        return client.replyMessage(event.replyToken, echo)
    case "刪除前項":
        result = await database.searchLast()
        console.log(result[0]['date']);
        console.log(result[0]['price']);
        return client.replyMessage(event.replyToken, removeDetails(
            result[0]['id'],
            result[0]['date'],
            result[0]['name'],
            result[0]['price']
            ))
    case "喔":
        break
    default:
        return client.replyMessage(event.replyToken, errormsg)

    }
    // use reply API

}

module.exports = handleEvent