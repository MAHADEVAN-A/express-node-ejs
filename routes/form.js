const express=require('express')
const router = express.Router()

router.post('/visitor',(req,res)=>{
    res.send('<h1>Post Form content</h1>')
})


module.exports= router;