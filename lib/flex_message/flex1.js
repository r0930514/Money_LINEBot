function flexmsg(
    name = "不明", 
    price = 0, 
    date = "1970-01-01" , 
    space = 0, 
    notiSwitch =0,
    sum = 0
    )
{
    let preview = 
    `
    新增了 ${price} 元
    總共累積 ${sum} 元
    `
    return flex1 = 
    {
    "type": "flex",
    "altText": preview,
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
              "text": "NT$"+price,
              "weight": "bold",
              "size": "3xl"
            },
            {
              "type": "text",
              "text": name,
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
                      "text": date,
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
                      "text": sum +"元",
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
                      "text": space+"格",
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
                      "text": notiSwitch,
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




}
module.exports = flexmsg
