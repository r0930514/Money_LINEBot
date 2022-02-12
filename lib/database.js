function additem(item, connection){
    command = `insert into CurrentSpending(\`name\`,\`date\`,price) values('${item.name}','${item.date}',${item.price});`;
    return new Promise(resolve=>{
        connection.query(command, (err, result)=>{
            resolve("完成")
        })
    })
}
function removeitem(id, connection){
    command = `delete from CurrentSpending where id=${id}`
    return new Promise(resolve=>{
        connection.query(command, (err, result)=>{
            resolve("完成")
        })
    })
}
function searchall(connection){
    return new Promise(resolve=>{
        connection.query("select * from CurrentSpending", (err, result)=>{
            resolve(result)
        })
    })
}
function clearing(connection){
    return new Promise(resolve=>{
        connection.query("TRUNCATE CurrentSpending;", (err, result)=>{
            resolve("完成")
        })
    })
}

module.exports = {
    additem,
    removeitem,
    searchall,
    clearing
};