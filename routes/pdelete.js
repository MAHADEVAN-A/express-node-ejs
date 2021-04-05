const express = require('express')
const router = express.Router()
const dmodel = require('../models/datamodel')
const pdata = require('../data/projects.json')
const fs = require('fs')

let count;
const dir1 = './public/assets/pimage';
const dir2 = './public/assets/pdetail';
count = pdata.length
// fs.readdir(dir1,(err,files)=>{
//     count = files.length;
//     // console.log(count)
// });

router.get('/pdelete/:id',async(req,res)=>{

    await dmodel.deleteProject(req.params.id,dir1,dir2)
    .then(post =>{ 
        console.log(post,'madman2')
        res.render('eproject',{title:'projects',cont:post,count:count,image:'pimage',detail:'epdetail',delet:'pdelete'})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })   
    res.end()
})

module.exports = router;
