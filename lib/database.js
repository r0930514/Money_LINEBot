function additem(item, connection, callback){
    command = `insert into CurrentSpending(name,date,price) values('晚餐','2021-04-12',451);`;
    connection.query(command), (err, result)=>{
            if(err)throw err;
            callback(result);
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

module.exports = {
    additem,
    removeitem,
    searchall
};