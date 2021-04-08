const express = require('express')
const router = express.Router()
const fs = require('fs')
const dmodel = require('../models/datamodel')

let dir1,dir2,bdata,detailib;

const middleware = async(req,res,next)=>{
bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
detailib = bdata.map(item => item.id)
dir1 = './public/assets/bimage';
dir2 = './public/assets/bdetail';
next()
}

router.get('/bdelete/:id',middleware,async(req,res)=>{
    await dmodel.deleteBlog(req.params.id,dir1,dir2)
    .then(post =>{ 
        res.render('eblog',{title:'blogs',cont:post,count:post.length,image:'bimage',detail:'ebdetail',delet:'bdelete',detailid:detailib})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })   
})

module.exports = router;
