const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')
const m = require('../helpers/middlewares')
// const app = express()

// const app = express()
const fs = require('fs')

// // parse form data
// app.use(express.urlencoded({ extended: false }))
// // parse json
// app.use(express.json())
const dir = './public/assets/pimage';
let pdata,detailip,acount,files;
pdata = require('../data/projects.json')
var count;

const middleware = (req,res,next)=>{
detailip = pdata.map(item => item.id)
count = pdata.length
files= fs.readdirSync(dir)
acount = files.length;
acount++;
next()
}


let imagename 
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/pimage')
    },
    filename: (req,file,cb)=>{
        const id=req.params.id
        const imag = pdata.filter(p => parseInt(p.id) == parseInt(id))
        console.log(imag,'mahad')
        imagename = imag[0].image
        cb(null,imagename+'.svg')
    }
})

const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        const dir = './public/assets/pimage'
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        imagename = 'image'+`${Date.now()}`
        cb(null,imagename+'.svg')
    }
})

const upload2 = multer({storage:fileStorageEngine1})
const upload = multer({storage:fileStorageEngine})


router.post('/projects/:id',middleware,upload.single('image'), m.checkContent, async(req,res)=>{
    console.log(req.params)
    console.log('helloworld');

    await dmodel.updateProject(req.params.id,req.body,imagename)
    .then(post =>{ 
        console.log(post)
        count = pdata.length
        res.render('eproject',{title:'projects',cont:post,count:count,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
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


router.post('/addprojects',middleware,upload2.single('image'),async(req,res)=>{
    console.log(req.body,req.file);
    console.log('in projects')

    await dmodel.insertProject(req.body,imagename)
    .then((post) =>{ 
        res.render('eproject',{title:'projects',cont:post,count:post.length,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })   
    res.end()
})


module.exports= router;