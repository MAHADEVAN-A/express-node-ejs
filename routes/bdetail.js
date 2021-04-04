const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')



const fs = require('fs')


var count4;
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        const dir4 = `./public/assets/bdetail/images${req.params.id}`
        
        fs.readdir(dir4,(err,files)=>{
            count4 = files.length
        })
        cb(null,dir4)
    },
    filename: (req,file,cb)=>{
        const id=req.params.i
        console.log(id)
        cb(null,'image'+id+'.svg')
    }
})

const upload = multer({storage:fileStorageEngine})

router.post('/bdetail/:id/:i',upload.single('image'),async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');
    let id = req.params.id

    await dmodel.updateBdetail(req.params.i,req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('ebdetail',{title:'bdetail',count:count4,image:'bdetail',id,details:post})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


module.exports= router;