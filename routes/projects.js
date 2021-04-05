const express=require('express')
const router = express.Router()
const multer = require('multer')
const app = express()
const dmodel = require('../models/datamodel')
const m = require('../helpers/middlewares')

// const app = express()
const fs = require('fs')

// // parse form data
// app.use(express.urlencoded({ extended: false }))
// // parse json
// app.use(express.json())
let count,acount;
const dir = './public/assets/pimage';
fs.readdir(dir,(err,files)=>{
    count = files.length;
    acount = files.length;
    acount++;
    console.log(count)
});

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/pimage')
    },
    filename: (req,file,cb)=>{
        const id=req.params.id
        console.log(id)
        cb(null,'image'+id+'.svg')
    }
})

const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        const dir = './public/assets/pimage'
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        cb(null,'image'+acount+'.svg')
    }
})

const upload2 = multer({storage:fileStorageEngine1})
const upload = multer({storage:fileStorageEngine})


router.post('/projects/:id',upload.single('image'), m.checkContent, async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');

    await dmodel.updateProject(req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('eproject',{title:'projects',cont:post,count:count,image:'pimage',detail:'epdetail'})
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


router.post('/addprojects',upload2.single('image'),(req,res)=>{
    console.log(req.body,req.file);
    console.log('in projects')
    res.end()
})


module.exports= router;