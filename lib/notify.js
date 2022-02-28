const linebot = require('@line/bot-sdk')
const config = require("./config")
const client = new linebot.Client(config);
async function sendNotify(
    msg = {type: "text", text: "測試用"},
    notifyswitch = 0
    ){
    console.log(msg)
    if(!notifyswitch) return;
    await client.pushMessage(config.pushPersonToken, msg)
}
module.exports = sendNotify