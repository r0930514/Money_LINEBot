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
        case "中餐":   
        case "晚餐": 
            try{
                await database.additem({
                    name: event.message.text,
                    date: time.getNowDate(),
                    price: 50
                })
                let count = await database.countData();
                let 
                return client.replyMessage(event.replyToken, addDetails(
                    event.message.text, 
                    (event.message.text=="早餐")? 50 : 100, 
                    time.getLocalTime(time.getNowDate()), 
                    count, 
                    0, 
                    database.priceSum()
                    )
                )
            }catch(e){
                return client.replyMessage(event.replyToken, {type: "text", text: "執行失敗"})
            }
        case "說明":
            echo = {type: 'text', 
            text: commandHelp
            }
            return client.replyMessage(event.replyToken, echo)
        case "刪除前項":
            try{
                result = await database.searchLast()
                console.log(result[0]['date']);
                console.log(result[0]['price']);
                return client.replyMessage(event.replyToken, removeDetails(
                    result[0]['id'],
                    time.getLocalTime(result[0]['date']),
                    result[0]['name'],
                    result[0]['price']
                ))
            }catch(e){
                return client.replyMessage(event.replyToken, {type: "text", text: "執行失敗"})
            }
        case "喔":
            break
        default:
            return client.replyMessage(event.replyToken, errormsg)
    }
    // use reply API

}

module.exports = handleEvent