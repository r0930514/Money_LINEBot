const linebot = require('@line/bot-sdk')
const config = require("./config")
const client = new linebot.Client(config);
async function sendNotify( msg = {type: "text", text: "測試用"} ){
    if(!config.notifyswitch) return;
    await client.pushMessage(config.pushPersonToken, msg)
}
module.exports = sendNotify