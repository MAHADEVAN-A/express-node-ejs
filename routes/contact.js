const express=require('express')
const fs = require('fs')
const app = express()
const router = express.Router()
const dmodel = require('../models/datamodel')
const m = require('../helpers/middlewares')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/assets/contact')
    },
    filename: (req,file,cb)=>{
        cb(null,'contact.svg')
    }
})

const upload = multer({storage:fileStorageEngine})


router.post('/contact', upload.single('contact'),m.checkContact,async(req,res)=>{
    console.log(req.body)
    console.log(req.file)

    await dmodel.updateContact(req.body)
    .then(post => res.render('econtact',{contactData:post}))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})


router.get('/getcontact',(req,res)=>{
    // console.log('hello')
    res.json(JSON.parse(fs.readFileSync('./data/contact.json')))
})

// router.put('/contact/email',(req,res)=>{
//     res.send('<h1>Upload contact email</h1>')
// })

// router.put('/contact/phno',(req,res)=>{
//     res.send('<h1>Upload contact phno</h1>')
// })


module.exports= router;