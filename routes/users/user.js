const express = require('express')
const router = express.Router()


const fs = require('fs')
let data,cdata,pdata,bdata,pdetails,bdetails,count1,count2,count3,count4,detailip,detailib,ptitle,btitle;
const middlewarefunctions = async(req,res,next)=>{

data = await JSON.parse(fs.readFileSync('./data/profile.json'))
cdata = await JSON.parse(fs.readFileSync('./data/contact.json'))
pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
pdetails = await JSON.parse(fs.readFileSync('./data/pdetails/details.json'))
bdetails = await JSON.parse(fs.readFileSync('./data/bdetails/details.json'))
count3=3,count4=3;
count1 = bdata.length
count2 = pdata.length

detailip = pdata.map(item => item.id)
detailib = bdata.map(item => item.id)
btitle = bdata.map(item => item.content)
ptitle = pdata.map(item => item.content)
next()
}

router.get('/',middlewarefunctions,(req,res)=>{
    res.render('userindex',{profileData:data})
})

router.get('/userproject',middlewarefunctions,(req,res)=>{
    res.render('userproject',{title:'projects',contt:pdata,count:count2,image:'pimage',detail:'userpdetail',detailid:detailip})
})

router.get('/userpdetail/:id',middlewarefunctions,(req,res)=>{
    let id = req.params.id
    res.render('userpdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:pdetails[id-1].pdetails,imagesname:pdetails[id-1].images})
})

router.get('/userblog',middlewarefunctions,(req,res)=>{
    res.render('userblog',{title:'blogs',contt:bdata,count:count1,image:'bimage',detail:'userbdetail',detailid:detailib})
})

router.get('/userbdetail/:id',middlewarefunctions,(req,res)=>{
    console.log('hellyeah')
    let id = req.params.id
    res.render('userbdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:bdetails[id-1].bdetails,imagesname:bdetails[id-1].images})
})

router.get('/usercontact',middlewarefunctions,(req,res)=>{
    res.render('usercontact',{contactData:cdata})
})





module.exports = router

