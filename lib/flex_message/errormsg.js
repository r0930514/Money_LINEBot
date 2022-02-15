errormsg = 
{
"type": "flex",
"altText": "請輸入正確的命令",
"contents": {
    "type": "bubble",
    "size": "mega",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "⚠️輸入錯誤",
              "size": "3xl",
              "flex": 4,
              "weight": "bold",
              "align": "start"
            }
          ]
        }
      ],
      "paddingAll": "20px",
      "backgroundColor": "#FFFFFF",
      "spacing": "md",
      "height": "90px",
      "paddingTop": "22px"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "點擊下方說明鈕查詢指令",
          "size": "md"
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "說明",
            "text": "說明"
          },
          "height": "sm",
          "margin": "lg"
        }
      ]
    }
  }
}
module.exports = errormsg