const express = require('express')
const router = express.Router()
const database = require('./database')
const sendNotify = require("./notify")
const removeDetails = require('./flex_message/removeDetails')

router.use(express.json())

router.get('/data', async(req, res)=>{
    try{
        result = await database.searchall()
        res.json(result)
    }catch(e){
        console.log(e);
        res.sendStatus(502)
    }
})

router.delete('/data/:id', async(req,res)=>{
    try{
        searchData = await database.searchbyId(req.params.id)
        result = await database.removeitem(req.params.id)
        console.log(searchData[0].id)
        echo = removeDetails(
            searchData[0].id,
            searchData[0].date,
            searchData[0].name,
            searchData[0].price,
            1
        )
        sendNotify(echo, 1)
        res.sendStatus(200)
    }catch(e){
        console.log(e);
        res.sendStatus(502)
    }
})

router.put('/data', async(req, res)=>{
    try{
        result = await database.edititem(req.body)
        res.sendStatus(200) 
    }catch(e){
        console.log(e);
        res.sendStatus(502)
    }
})

router.post('/data', async(req, res)=>{
    try{
        result = await database.additem(req.body)
        res.sendStatus(200) 
    }catch(e){
        console.log(e);
        res.sendStatus(502)
    }
})

router.delete('/data/other/all', async(req, res)=>{
    try{
        result = await database.clearing()
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(502)
    }
})


module.exports = router
