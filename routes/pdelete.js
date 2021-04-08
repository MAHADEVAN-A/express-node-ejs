const express = require('express')
const router = express.Router()
const dmodel = require('../models/datamodel')
const fs = require('fs')

let pdata,detailip
const middleware = async(req,res,next)=>{
pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
detailip = pdata.map(item => item.id)
next()
}

const dir1 = './public/assets/pimage';
const dir2 = './public/assets/pdetail';

router.get('/pdelete/:id',middleware,async(req,res)=>{

    await dmodel.deleteProject(req.params.id,dir1,dir2)
    .then(post =>{ 
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
