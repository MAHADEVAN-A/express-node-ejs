const express = require('express')
const router = express.Router()
const dmodel = require('../models/datamodel')
const bdata = require('../data/blogs.json')
const fs = require('fs')
const detailib = bdata.map(item => item.id)

var count;
const dir1 = './public/assets/bimage';
const dir2 = './public/assets/bdetail';

// fs.readdir(dir1,(err,files)=>{
//     count = files.length;
//     // console.log(count)
// });

router.get('/bdelete/:id',async(req,res)=>{
    await dmodel.deleteBlog(req.params.id,dir1,dir2)
    .then(post =>{ 
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
