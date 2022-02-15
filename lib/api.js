const express = require('express')
const router = express.Router();
const database = require('./database');
router.use(express.json())

router.get('/data', async(req, res)=>{
    result = await database.searchall()
    res.json(result);

})
router.delete('/data/:id', async(req,res)=>{
    result = await database.removeitem(req.params.id)
    res.sendStatus(200);

})
router.post('/data', async(req, res)=>{
    result = await database.additem(req.body)
    res.sendStatus(200); 
    
})

router.delete('/data/other/all', async(req, res)=>{
    result = await database.clearing()
    res.sendStatus(200);
})


module.exports = router