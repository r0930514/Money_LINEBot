const { DateTime } = require('luxon')

function getLocalTime(UTCtime = (new Date).toISOString(), format = "yyyy-MM-dd"){
    return DateTime.fromISO(UTCtime, {zone: 'Asia/Taipei'}).toFormat(format)
}
module.exports ={
    getLocalTime
}
