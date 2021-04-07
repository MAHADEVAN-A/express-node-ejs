const express = require('express')
const router = express.Router()
const dmodel = require('../models/datamodel')
const fs = require('fs')

let pdata,detailip
const middleware = (req,res,next)=>{
pdata = require('../data/projects.json')
detailip = pdata.map(item => item.id)
next()
}

// var count;
const dir1 = './public/assets/pimage';
const dir2 = './public/assets/pdetail';

// fs.readdir(dir1,(err,files)=>{
//     count = files.length;
//     // console.log(count)
// });

router.get('/pdelete/:id',middleware,async(req,res)=>{

    await dmodel.deleteProject(req.params.id,dir1,dir2)
    .then(post =>{ 
        console.log(post,'madman2')
        pdata = post;
        res.render('eproject',{title:'projects',cont:post,count:post.length,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })   
})

module.exports = router;
