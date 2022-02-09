function additem(item, connection, callback){
    command = `insert into CurrentSpending(\`name\`,\`date\`,price) values('${item.name}','${item.date}',${item.price});`;
    console.log(command)
    connection.query(command), (err, result)=>{
        callback(err, result);
    }
}
function removeitem(id, connection, callback){
    command = `delete from CurrentSpending where id=${id}`
    connection.query(command, (err, result)=>{
        if(err)throw err;
        callback(result)
    })
}
function searchall(connection, callback){
    connection.query("select * from CurrentSpending", (err, result)=>{
        if(err)throw err;
        callback(result);
    });
}
function clearing(connection, callback){
    connection.query("TRUNCATE CurrentSpending;", (err, result)=>{
        if(err)throw err;
        callback(result)
    })
}

module.exports = {
    additem,
    removeitem,
    searchall,
    clearing
};