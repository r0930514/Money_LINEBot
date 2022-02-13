flex1 = 
{
    "type": "flex",
    "altText": "預覽",
    "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "NT$",
              "weight": "bold",
              "size": "3xl"
            },
            {
              "type": "text",
              "text": "名字",
              "weight": "regular",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "none",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "xxl",
                  "contents": [
                    {
                      "type": "text",
                      "text": "日期",
                      "color": "#aaaaaa",
                      "size": "md",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "date",
                      "wrap": true,
                      "color": "#666666",
                      "size": "md",
                      "flex": 5
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "xxl",
                  "contents": [
                    {
                      "type": "text",
                      "text": "已累積",
                      "color": "#aaaaaa",
                      "size": "md",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "sum" +"元",
                      "wrap": true,
                      "color": "#666666",
                      "size": "md",
                      "flex": 5
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "xxl",
                  "contents": [
                    {
                      "type": "text",
                      "text": "剩餘格數",
                      "color": "#aaaaaa",
                      "size": "md",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "space"+"格",
                      "wrap": true,
                      "color": "#666666",
                      "size": "md",
                      "flex": 5
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "xxl",
                  "contents": [
                    {
                      "type": "text",
                      "text": "通知開關",
                      "color": "#aaaaaa",
                      "size": "md",
                      "flex": 2
                    },
                    {
                      "type": "text",
                      "text": "開",
                      "wrap": true,
                      "color": "#666666",
                      "size": "md",
                      "flex": 5
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
}
module.exports = flex1
