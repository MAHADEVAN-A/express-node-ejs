const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')


const fs = require('fs')

// let count;
// const dir = `./public/assets/bdetail/images${id}`;
// fs.readdir(dir,(err,files)=>{
//     count = files.length;
//     // count++;
//     console.log(count)
// });
var count3;
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        const dir3 = `./public/assets/pdetail/images${req.params.id}`
        
        fs.readdir(dir3,(err,files)=>{
            count3 = files.length
        })
        cb(null,dir3)
    },
    filename: (req,file,cb)=>{
        const id=req.params.i
        console.log(id)
        cb(null,'image'+id+'.svg')
    }
})

const upload = multer({storage:fileStorageEngine})

router.post('/pdetail/:id/:i',upload.single('image'),async(req,res)=>{
    console.log(req.params)
    console.log(req.body);
    let id = req.params.id

    await dmodel.updatePdetail(req.params.i,req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('epdetail',{title:'pdetail',count:count3,image:'pdetail',id,details:post})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


module.exports= router;