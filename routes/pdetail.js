const express=require('express')
const router = express.Router()
const multer = require('multer')
const dmodel = require('../models/datamodel')
const helper = require('../helpers/helper.js')

const fs = require('fs')

let detailip,ptitle,pdetails,pdata;

const middleware = async(req,res,next)=>{
pdetails = await JSON.parse(fs.readFileSync('./data/pdetails/details.json'));
pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
detailip = pdata.map(item => item.id)
ptitle = pdata.map(item => item.content)
next()
}

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
        cb(null,'image'+id+'.svg')
    }
})
var jj = 1;
let imagesname,iid
const fileStorageEngine1 = multer.diskStorage({
    destination: (req,file,cb)=>{
        iid = helper.getNewId(pdetails)
        imagesname=`images${iid}`
        fs.mkdir(`./public/assets/pdetail/images${iid}`,{recursive:true},(err)=>{
            console.log(err)
        })
        const dir = `./public/assets/pdetail/images${iid}`
        cb(null,dir)
    },
    filename: (req,file,cb)=>{
        cb(null,`image${jj}.svg`)
        jj++;
    }
})

const upload = multer({storage:fileStorageEngine})
const upload2 = multer({storage:fileStorageEngine1})

router.post('/pdetail/:id/:i',middleware,upload.single('image'),async(req,res)=>{
    let id = req.params.id

    await dmodel.updatePdetail(req.params.i,req.params.id,req.body)
    .then(post =>{ 
        console.log(post)
        res.render('epdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:post})
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


router.post('/addpdetail',middleware,upload2.array('images',3),async(req,res)=>{

    console.log(req.body,req.files);
    console.log("in pdetail")

    await dmodel.insertPdetail(req.body,imagesname)
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


module.exports= router;