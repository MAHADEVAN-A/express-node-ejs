const express=require('express')
const app = express()
// const path = require('path')
const router = express.Router()
const multer = require('multer')

const dmodel = require('../models/datamodel')
const m = require('../helpers/middlewares')
// const ejs = require('ejs')

// app.set('view engine','ejs')
// app.set('views',__dirname+'/views')
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/profile')
    },
    filename: (req,file,cb)=>{
        cb(null,'profile.svg')
    }
})

const upload = multer({storage:fileStorageEngine})

router.post('/profile',upload.single('image'), m.checkContent, async(req,res)=>{
    console.log(req.body)
    console.log(req.file)


    await dmodel.updateProfile(req.body)
    .then(post => res.render('index',{profileData:post}))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
    console.log('successfully updated profile')
})

// router.put('/profile/content',(req,res)=>{
//     res.send('<h1>Upload profile content</h1>')
// })



module.exports= router;