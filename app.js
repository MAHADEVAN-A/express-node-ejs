const express = require('express')
const fs = require('fs')
const data = require('./data/profile.json')
const cdata = require('./data/contact.json')
const pdata = require('./data/projects.json')
const bdata = require('./data/blogs.json')

const app = express()
const routes= require('./routes/index')
const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('./public'))
app.use(express.static('./images'))

app.use('/api',routes)
var count1,count2,count3,count4;
const dir1 = './public/assets/bimage'
const dir2 = './public/assets/pimage'
const dir3 = './public/assets/pdetail'
const dir4 = './public/assets/bdetail'
fs.readdir(dir1,(err,files)=>{
     count1 = files.length
})
fs.readdir(dir2,(err,files)=>{
    count2 = files.length
})
fs.readdir(dir3,(err,files)=>{
    count3 = files.length
})
fs.readdir(dir4,(err,files)=>{
    count4 = files.length
})

app.get('/',(req,res)=>{
    res.render('index',{profileData:data})
})

app.get('/eproject',(req,res)=>{
    res.render('eproject',{title:'projects',cont:pdata,count:count1,image:'pimage',detail:'epdetail'})
})

app.get('/epdetail/:id',(req,res)=>{
    const id = req.params.id
    res.render('epdetail',{title:'pdetail',count:count3,image:'pdetail',id})
})

app.get('/eblog',(req,res)=>{
    res.render('eblog',{title:'blogs',cont:bdata,count:count2,image:'bimage',detail:'ebdetail'})
})

app.get('/ebdetail/:id',(req,res)=>{
    const id = req.params.id
    res.render('ebdetail',{title:'bdetail',count:count4,image:'bdetail',id})
})

app.get('/econtact',(req,res)=>{
    res.render('econtact',{contactData:cdata})
})

app.listen(5000,()=>{
    console.log('Server listening on port 5000');
})