const express = require('express')
const router = express.Router()
const database = require('./database')
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
        result = await database.removeitem(req.params.id)
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
