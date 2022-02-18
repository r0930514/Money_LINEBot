const fs = require('fs');

if(process.env.channelId == undefined){
    const rawdata = fs.readFileSync('Token.json');
    config = JSON.parse(rawdata);
}else{
    config = {
        "channelId" : process.env.channelId ,
        "channelSecret" : process.env.channelSecret,
        "channelAccessToken" : process.env.channelAccessToken,
        "dbURL" : process.env.CLEARDB_DATABASE_URL
    };
}
module.exports = config