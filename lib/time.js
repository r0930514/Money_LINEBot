function getNowDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
}
function getLocalTime(UTCtime){
    let UTCtimeObj = new Date(UTCtime)
    return UTCtimeObj.toLocaleDateString('zh-TW');
}
module.exports ={
    getNowDate,
    getLocalTime
}