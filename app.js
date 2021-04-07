const express = require('express')
const fs = require('fs')
// const path = require('path')

// const dirr = path.resolve(__dirname,'./public/assets/pimage');
// console.log(dirr)

const app = express()
const routes= require('./routes/index')
const userRoutes= require('./routes/users/user')
const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('./public'))

app.use('/',userRoutes)

app.use('/api',routes)
let count1,count2,count3,count4,data,cdata,pdata,bdata,pdetails,bdetails,detailip,detailib,btitle,ptitle;
const middlewareFunctions = (req,res,next)=>{
data = require('./data/profile.json')
cdata = require('./data/contact.json')
pdata = require('./data/projects.json')
bdata = require('./data/blogs.json')
pdetails = require('./data/pdetails/details.json')
bdetails = require('./data/bdetails/details.json')
detailip = pdata.map(item => item.id)
detailib = bdata.map(item => item.id)
// console.log(detailip);
btitle = bdata.map(item => item.content)
ptitle = pdata.map(item => item.content)
count3=3,count4=3;
count1 = bdata.length
count2 = pdata.length
// console.log(btitle)
// console.log(ptitle)
next()
}
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

app.get('/admin',middlewareFunctions,(req,res)=>{
    res.render('index',{profileData:data})
})

app.get('/eproject',middlewareFunctions,(req,res)=>{
    res.render('eproject',{title:'projects',cont:pdata,count:count2,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
})

app.get('/epdetail/:id',middlewareFunctions,(req,res)=>{
    let id = req.params.id
    res.render('epdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:pdetails[id-1].pdetails,imagesname:pdetails[id-1].images})
})

app.get('/eblog',middlewareFunctions,(req,res)=>{
    res.render('eblog',{title:'blogs',cont:bdata,count:count1,image:'bimage',detail:'ebdetail',delet:'bdelete',detailid:detailib})
})
// console.log(bdetails[0].bdetails)
app.get('/ebdetail/:id',middlewareFunctions,(req,res)=>{
    console.log('hellyeah')
    let id = req.params.id
    res.render('ebdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:bdetails[id-1].bdetails,imagesname:bdetails[id-1].images})
})

app.get('/econtact',middlewareFunctions,(req,res)=>{
    res.render('econtact',{contactData:cdata})
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})