const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')



const fs = require('fs')

let acount;
const dir = './public/assets/bdetail/';
fs.readdir(dir,(err,files)=>{
    acount = files.length;
    acount++;
});

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

const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        fs.mkdir(`./public/assets/bdetail/images${acount}`,{recursive:true},(err)=>{
            console.log(err)
        })
        const dir = `./public/assets/bdetail/images${acount}`
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload2 = multer({storage:fileStorageEngine1})
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

router.post('/addbdetail',upload2.array('images',3),(req,res)=>{
    console.log(req.body,req.files);
    res.end('hello')
})


module.exports= router;