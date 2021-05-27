const express = require('express')
const fs = require('fs')
const cors = require('cors')
// const path = require('path')


const app = express()
const routes= require('./routes/index')
const userRoutes= require('./routes/users/user')
app.use(cors())
// const ejs = require('ejs')
app.set('view engine','ejs')
app.use(express.static('./public'))

app.use('/',userRoutes)


app.use('/api',routes)

let data,pdata,cdata,bdata,pdetails,bdetails,count1,count2,count3,count4,detailip,detailib,btitle,ptitle;

// const middlewareFunctions = async(req,res,next)=>{
// data = await JSON.parse(fs.readFileSync('./data/profile.json'))
// pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
// cdata = await JSON.parse(fs.readFileSync('./data/contact.json'))
// bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
// pdetails = await JSON.parse(fs.readFileSync('./data/pdetails/details.json'))
// bdetails = await JSON.parse(fs.readFileSync('./data/bdetails/details.json'))
// detailip = pdata.map(item => item.id)
// detailib = bdata.map(item => item.id)
// btitle = bdata.map(item => item.content)
// ptitle = pdata.map(item => item.content)
// count3=3,count4=3;
// count1 = bdata.length
// count2 = pdata.length
// next()
// }

const middlewarefunctions1 = async(req,res,next)=>{
    data = await JSON.parse(fs.readFileSync('./data/profile.json'))
    next()
}

const middlewarefunctions2 = async(req,res,next)=>{
    pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
    count2 = pdata.length
    detailip = pdata.map(item => item.id)
    next()
}

const middlewarefunctions3 = async(req,res,next)=>{
    pdata = await JSON.parse(fs.readFileSync('./data/projects.json'))
    pdetails = await JSON.parse(fs.readFileSync('./data/pdetails/details.json'))
    count3=3;
    ptitle = pdata.map(item => item.content)
    next()
}

const middlewarefunctions4 = async(req,res,next)=>{
    bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
    count1 = bdata.length
    detailib = bdata.map(item => item.id)
    next()
}

const middlewarefunctions5 = async(req,res,next)=>{
    bdata = await JSON.parse(fs.readFileSync('./data/blogs.json'))
    bdetails = await JSON.parse(fs.readFileSync('./data/bdetails/details.json'))
    count4=3;
    btitle = bdata.map(item => item.content)
    next()
}

const middlewarefunctions6 = async(req,res,next)=>{
    cdata = await JSON.parse(fs.readFileSync('./data/contact.json'))
    next()
}

app.get('/admin',middlewarefunctions1,(req,res)=>{
    res.render('index',{profileData:data})
})

app.get('/OZsum',(req,res)=>{
    res.render('OZsum')
})

app.get('/eproject',middlewarefunctions2,(req,res)=>{
    res.render('eproject',{title:'projects',cont:pdata,count:count2,image:'pimage',detail:'epdetail',delet:'pdelete',detailid:detailip})
})

app.get('/epdetail/:id',middlewarefunctions3,(req,res)=>{
    let id = req.params.id
    res.render('epdetail',{dtitle:ptitle[id-1],title:'pdetail',count:count3,image:'pdetail',id,details:pdetails[id-1].pdetails,imagesname:pdetails[id-1].images})
})

app.get('/eblog',middlewarefunctions4,(req,res)=>{
    res.render('eblog',{title:'blogs',cont:bdata,count:count1,image:'bimage',detail:'ebdetail',delet:'bdelete',detailid:detailib})
})

app.get('/ebdetail/:id',middlewarefunctions5,(req,res)=>{
    let id = req.params.id
    res.render('ebdetail',{dtitle:btitle[id-1],title:'bdetail',count:count4,image:'bdetail',id,details:bdetails[id-1].bdetails,imagesname:bdetails[id-1].images})
})

app.get('/econtact',middlewarefunctions6,(req,res)=>{
    res.render('econtact',{contactData:cdata})
})

app.get('/portfolio',(req,res)=>{
    res.render('portfolio')
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})