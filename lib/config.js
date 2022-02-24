const fs = require('fs');
try{
    const rawdata = fs.readFileSync('Token.json');
    data = JSON.parse(rawdata);
}catch{
    console.log("failed to readfile")
    data = {}
}

config = {
    "channelSecret" : process.env.channelSecret || data.channelSecret,
    "channelAccessToken" : process.env.channelAccessToken || data.channelAccessToken,
    "dbURL" : process.env.CLEARDB_DATABASE_URL || data.dbURL,
    "pushPersonToken" : process.env.pushPersonToken || data.pushPersonToken
};
module.exports = config
