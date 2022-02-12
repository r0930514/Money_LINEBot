const express = require('express')
const router = express.Router();
const database = require('./database');
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

router.get('/data', async(req, res)=>{
    result = await database.searchall(connection)
    console.log(result)
    res.json(result);

})
router.delete('/data/:id', async(req,res)=>{
    result = await database.removeitem(req.params.id, connection)
    res.sendStatus(200);

})
router.post('/data', async(req, res)=>{
    result = await database.additem(req.body, connection)
    res.sendStatus(200); 
    
})

router.delete('/data/other/all', async(req, res)=>{
    result = await database.clearing(connection)
    res.sendStatus(200);
})

module.exports = router