//當事件被觸發的動作
function handleEvent(event){
    if(event.type !== 'message' || event.message.type !== 'text'){
        return null;
    }

    const echo = {type: 'text', text: event.message.text };
    client.replyMessage(event.replyToken, echo);
    return;
}
module.exports = handleEvent