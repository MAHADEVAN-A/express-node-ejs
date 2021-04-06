const express = require('express')
const fs = require('fs')
const path = require('path')
const data = require('./data/profile.json')
const cdata = require('./data/contact.json')
const pdata = require('./data/projects.json')
const bdata = require('./data/blogs.json')
const pdetails = require('./data/pdetails/details.json')
const bdetails = require('./data/bdetails/details.json')

// const dirr = path.resolve(__dirname,'./public/assets/pimage');
// console.log(dirr)

const app = express()
const routes= require('./routes/index')
const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('./public'))
app.use(express.static('./images'))

app.use('/api',routes)
var count1,count2,count3=3,count4=3;
count1 = bdata.length
count2 = pdata.length

const detailip = pdata.map(item => item.id)
const detailib = bdata.map(item => item.id)
console.log(detailip);
const btitle = bdata.map(item => item.content)
const ptitle = pdata.map(item => item.content)
console.log(btitle)
console.log(ptitle)
// const dir1 = './public/assets/bimage'
// const dir2 = './public/assets/pimage'
// const dir3 = './public/assets/pdetail'
// const dir4 = './public/assets/bdetail'
// fs.readdir(dir1,(err,files)=>{
//      count1 = files.length
// })
// fs.readdir(dir2,(err,files)=>{
//     count2 = files.length
// })
// fs.readdir(dir3,(err,files)=>{
//     count3 = files.length
// })
// fs.readdir(dir4,(err,files)=>{
//     count4 = files.length
// })


console.log('image'+`${Date.now()}`)

app.get('/',(req,res)=>{
    res.render('index',{profileData:data})
})

app.get('/eproject',(req,res)=>{
    res.render('eproject',{title:'projects',cont:pdata,count:count2,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
})

app.get('/epdetail/:id',(req,res)=>{
    let id = req.params.id
    res.render('epdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:pdetails[id-1].pdetails})
})

app.get('/eblog',(req,res)=>{
    res.render('eblog',{title:'blogs',cont:bdata,count:count1,image:'bimage',detail:'ebdetail',delet:'bdelete',detailid:detailib})
})
// console.log(bdetails[0].bdetails)
app.get('/ebdetail/:id',(req,res)=>{
    console.log('hellyeah')
    let id = req.params.id
    res.render('ebdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:bdetails[id-1].bdetails})
})

app.get('/econtact',(req,res)=>{
    res.render('econtact',{contactData:cdata})
})

app.listen(5000,()=>{
    console.log('Server listening on port 5000');
})