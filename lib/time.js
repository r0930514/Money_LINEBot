const { DateTime } = require('luxon')
function getNowDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
}
function getLocalTime(UTCtime = (new Date).toISOString(), format = "yyyy-MM-dd"){
    return DateTime.fromISO(UTCtime, {zone: 'Asia/Taipei'}).toFormat(format)
}
module.exports ={
    getNowDate,
    getLocalTime
}
