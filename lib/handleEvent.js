// event handler
const addDetails = require('./flex_message/addDetails')
const errormsg = require('./flex_message/errormsg')
const removeDetails = require('./flex_message/removeDetails')
const database = require('./database')
const { getLocalTime } = require("./time")
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
            postbackobj = JSON.parse(event.postback.data)
            echo = {type: 'text', text: ""}
            switch(postbackobj.type){
                case "Delete":
                    try{
                        database.removeitem(postbackobj.content)
                        echo.text = "刪除成功"
                        return client.replyMessage(event.replyToken, echo)
                    }catch(e){
                        echo.text = "刪除失敗"  
                        return client.replyMessage(event.replyTokenm, echo)
                    }
                
            }
            console.log(postbackobj.content);
            //
            
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
                    date: getLocalTime(),
                    price: (event.message.text=="早餐")? 50:100
                })
                let count = await database.countData();
                let priceSum = await database.priceSum();
                return client.replyMessage(event.replyToken, addDetails(
                    event.message.text, 
                    (event.message.text=="早餐")? 50:100, 
                    getLocalTime(),
                    count, 
                    0, 
                    priceSum
                    )
                )
            }catch(e){
                console.log(e)
                return client.replyMessage(event.replyToken, {type: "text", text: "新增失敗"})
            }
        case "說明":
            echo = {type: 'text', text: commandHelp}
            return client.replyMessage(event.replyToken, echo)
        case "刪除前項":
            try{
                result = await database.searchLast()
                return client.replyMessage(event.replyToken, removeDetails(
                    result[0]['id'],
                    getLocalTime(result[0]['date'].toISOString()),
                    result[0]['name'],
                    result[0]['price']
                ))
            }catch(e){
                console.log(e);
                return client.replyMessage(event.replyToken, {type: "text", text: "執行失敗"})
            }
        case "結算":
            try{
                result = await database.searchall()
                let priceSum = await database.priceSum()
                await database.clearing()
                console.log(priceSum);
                for(i in result){
                    echo.text += (result[i]["id"]-4)/10+1 + "、"
                    echo.text += result[i]["name"] + " "
                    echo.text += getLocalTime(result[i]["date"].toISOString(), "MM/dd") +" "
                    echo.text += result[i]["price"] + "元\n"
                }
                echo.text += `累積${priceSum}元`
                return client.replyMessage(event.replyToken, echo)
            }catch(e){
                console.log(e);
                return client.replyMessage(event.replyToken, {type: "text", text: "結算失敗"})
            }
        case "喔":
            console.log("沒有回應")
            break
        default:
            return client.replyMessage(event.replyToken, errormsg)
    }
    // use reply API

}

module.exports = handleEvent
