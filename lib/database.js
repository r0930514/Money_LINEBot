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
connection.on('error', (err)=>{
    console.log(err.code)
    connection.connect();
})

function additem(item){
    command = `insert into CurrentSpending(\`name\`,\`date\`,price) values('${item.name}','${item.date}',${item.price});`;
    return new Promise(resolve=>{
        connection.query(command, (err, result)=>{
            resolve("完成")
        })
    })
}
function removeitem(id){
    command = `delete from CurrentSpending where id=${id}`
    return new Promise(resolve=>{
        connection.query(command, (err, result)=>{
            resolve("完成")
        })
    })
}
function searchall(){
    return new Promise(resolve=>{
        connection.query("select * from CurrentSpending", (err, result)=>{
            resolve(result)
        })
    })
}
function clearing(){
    return new Promise(resolve=>{
        connection.query("TRUNCATE CurrentSpending;", (err, result)=>{
            resolve("完成")
        })
    })
}
function searchLast(){
    return new Promise(resolve=>{
        connection.query("select * from CurrentSpending order by `id` DESC limit 1", (err, result)=>{
            resolve(result)            
        })
    })
}

module.exports = {
    additem,
    removeitem,
    searchall,
    clearing,
    searchLast
};