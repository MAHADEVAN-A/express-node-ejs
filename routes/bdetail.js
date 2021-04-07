const express=require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const dmodel = require('../models/datamodel')
const helper = require('../helpers/helper.js')



let acount,bdata,detailib,btitle,files,bdetails;
var count;
const dir = './public/assets/bdetail/';

const middleware = (req,res,next)=>{
bdetails = require('../data/bdetails/details.json');
bdata = require('../data/blogs.json')
detailib = bdata.map(item => item.id)
btitle = bdata.map(item => item.content)
count = bdata.length
files=fs.readdirSync(dir)
acount = files.length;
acount++;
next()
}


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
var jj = 1;
let imagesname,iid
const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        iid = helper.getNewId(bdetails)
        imagesname=`images${iid}`
        fs.mkdir(`./public/assets/bdetail/images${iid}`,{recursive:true},(err)=>{
            console.log(err)
        })
        const dir = `./public/assets/bdetail/images${iid}`
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        cb(null,`image${jj}.svg`)
        jj++;
    }
})

const upload2 = multer({storage:fileStorageEngine1})
const upload = multer({storage:fileStorageEngine})

router.post('/bdetail/:id/:i',middleware,upload.single('image'),async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');
    let id = req.params.id

    await dmodel.updateBdetail(req.params.i,req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('ebdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:post})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

router.post('/addbdetail',middleware,upload2.array('images',3),async(req,res)=>{
    console.log(req.body,req.files);

    await dmodel.insertBdetail(req.body,imagesname)
    .then(post =>{ 
        console.log(post)
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


module.exports= router;