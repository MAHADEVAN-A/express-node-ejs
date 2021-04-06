const express = require('express')
const router = express.Router()

const fs = require('fs')
const data = require('../../data/profile.json')
const cdata = require('../../data/contact.json')
const pdata = require('../../data/projects.json')
const bdata = require('../../data/blogs.json')
const pdetails = require('../../data/pdetails/details.json')
const bdetails = require('../../data/bdetails/details.json')

var count1,count2,count3=3,count4=3;
count1 = bdata.length
count2 = pdata.length

const detailip = pdata.map(item => item.id)
const detailib = bdata.map(item => item.id)
const btitle = bdata.map(item => item.content)
const ptitle = pdata.map(item => item.content)


router.get('/',(req,res)=>{
    res.render('userindex',{profileData:data})
})

router.get('/userproject',(req,res)=>{
    res.render('userproject',{title:'projects',cont:pdata,count:count2,image:'pimage',detail:'userpdetail',detailid:detailip})
})

router.get('/userpdetail/:id',(req,res)=>{
    let id = req.params.id
    res.render('userpdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:pdetails[id-1].pdetails})
})

router.get('/userblog',(req,res)=>{
    res.render('userblog',{title:'blogs',cont:bdata,count:count1,image:'bimage',detail:'userbdetail',detailid:detailib})
})

router.get('/userbdetail/:id',(req,res)=>{
    console.log('hellyeah')
    let id = req.params.id
    res.render('userbdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:bdetails[id-1].bdetails})
})

router.get('/usercontact',(req,res)=>{
    res.render('usercontact',{contactData:cdata})
})





module.exports = router

