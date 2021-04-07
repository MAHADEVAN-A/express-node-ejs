const express = require('express')
const router = express.Router()
const fs = require('fs')
const dmodel = require('../models/datamodel')

let dir1,dir2,count,bdata,detailib;

const middleware = (req,res,next)=>{
bdata = require('../data/blogs.json')
detailib = bdata.map(item => item.id)
dir1 = './public/assets/bimage';
dir2 = './public/assets/bdetail';
next()
}
// fs.readdir(dir1,(err,files)=>{
//     count = files.length;
//     // console.log(count)
// });

router.get('/bdelete/:id',middleware,async(req,res)=>{
    await dmodel.deleteBlog(req.params.id,dir1,dir2)
    .then(post =>{ 
        bdata = post
        count = bdata.length
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
