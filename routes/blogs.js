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
let count;
const dir = './public/assets/bimage';
fs.readdir(dir,(err,files)=>{
    count = files.length;
    // count++;
    console.log(count)
});

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/bimage')
    },
    filename: (req,file,cb)=>{
        const id=req.params.id
        console.log(id)
        cb(null,'image'+id+'.svg')
    }
})

const upload = multer({storage:fileStorageEngine})


router.post('/blogs/:id',upload.single('image'),async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');

    await dmodel.updateBlog(req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('eblog',{title:'blogs',cont:post,count:count,image:'bimage',detail:'ebdetail'})
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


module.exports= router;