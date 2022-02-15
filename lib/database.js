const mysql = require('mysql');
const config = require('./config')
//database init
const connection = mysql.createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database ,
    charset : 'utf8mb4'
}); 

connection.getConnection(
    function(err){
        if(err){
            console.log("failed to connect database");
        }
    }
)

function additem(item){
    command = `insert into CurrentSpending(\`name\`,\`date\`,price) values('${item.name}','${item.date}',${item.price});`;
    return new Promise((resolve, reject)=>{
        connection.query(command, (err, result)=>{
            if(err){
                reject("新增失敗")
            }else{
                resolve("完成")
            }
        })
    })
}
function removeitem(id){
    command = `delete from CurrentSpending where id=${id}`
    return new Promise((resolve, reject)=>{
        connection.query(command, (err, result)=>{
            if(err){
                reject("移除失敗")
            }else{
                resolve("完成")
            }
        })
    })
}
function searchall(){
    return new Promise((resolve, reject)=>{
        connection.query("select * from CurrentSpending", (err, result)=>{
            if(err){
                reject("查詢失敗")
            }else{
                resolve(result)
            }
        })
    })
}
function clearing(){
    return new Promise((resolve, reject)=>{
        connection.query("TRUNCATE CurrentSpending;", (err, result)=>{
            if(err){
                reject("清除失敗")
            }else{
                resolve("完成")
            }
        })
    })
}
function searchLast(){
    return new Promise((resolve, reject)=>{
        connection.query("select * from CurrentSpending order by `id` DESC limit 1", (err, result)=>{
            if(err){
                reject("最後一個搜尋失敗")
            }else{
                resolve(result)
            }
        })
    })
}
function countData(){
    return new Promise((resolve, reject)=>{
        connection.query("select count(*) from CurrentSpending;", (err, result)=>{
            if(err){
                reject("無法尋找資料的數量")
            }else{
                resolve(result)
            }
        })
    })
}
module.exports = {
    additem,
    removeitem,
    searchall,
    clearing,
    searchLast,
    countData
};