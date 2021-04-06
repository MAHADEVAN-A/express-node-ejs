const express=require('express')
const router = express.Router()
const multer = require('multer')
const app = express()
const dmodel = require('../models/datamodel')
const m = require('../helpers/middlewares')
const bdata = require('../data/blogs.json')
const detailib = bdata.map(item => item.id)

// const app = express()
const fs = require('fs')

// // parse form data
// app.use(express.urlencoded({ extended: false }))
// // parse json
// app.use(express.json())
var count,acount;
count = bdata.length
const dir = './public/assets/bimage';
fs.readdir(dir,(err,files)=>{
    acount = files.length;
    acount++;
    console.log(count)
});
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


router.post('/blogs/:id',upload.single('image'),async(req,res)=>{
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

// router.get('/project',(req,res)=>{
//     res.send('<h1>Upload project</h1>')
// })

// router.put('/project/image/:id',(req,res)=>{
//     const id=req.params.id
//     console.log(id);
//     res.send('<h1>Upload project image</h1>')
// })

router.post('/addblogs',upload2.single('image'),async(req,res)=>{

    await dmodel.insertBlog(req.body,imagename)
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

module.exports= router;