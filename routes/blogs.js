const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')

const fs = require('fs')

var count;
let bdata,detailib;

const middleware = async(req,res,next)=>{
bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
detailib = bdata.map(item => item.id)
count = bdata.length
next()
}


let imagename
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/bimage')
    },
    filename: (req,file,cb)=>{
        const id=req.params.id
        const imag = bdata.filter(p => parseInt(p.id) == parseInt(id))
        // console.log(imag,'mahad')
        imagename = imag[0].image
        cb(null,imagename+'.svg')
    }
})

const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        const dir = './public/assets/bimage'
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        imagename='image'+`${Date.now()}`
        cb(null,imagename+'.svg')
    }
})

const upload2 = multer({storage:fileStorageEngine1})
const upload = multer({storage:fileStorageEngine})


router.post('/blogs/:id',middleware,upload.single('image'),async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');

    await dmodel.updateBlog(req.params.id,req.body,imagename)
    .then(post =>{ 
        console.log(post)
        count = bdata.length
        res.render('eblog',{title:'blogs',cont:post,count:count,image:'bimage',detail:'ebdetail',delet:'bdelete',detailid:detailib})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

router.post('/addblogs',middleware,upload2.single('image'),async(req,res)=>{

    await dmodel.insertBlog(req.body,imagename)
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

module.exports= router;