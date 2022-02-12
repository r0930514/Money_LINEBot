const fs = require('fs');

if(process.env.channelId == undefined){
    const rawdata = fs.readFileSync('Token.json');
    config = JSON.parse(rawdata);
}else{
    config = {
        "channelId" : process.env.channelId ,
        "channelSecret" : process.env.channelSecret,
        "channelAccessToken" : process.env.channelAccessToken,
        "host" : process.env.host,
        "user" : process.env.user,
        "password" : process.env.password,
        "database" : process.env.database 
    };
}
module.exports = config