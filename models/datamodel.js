let projects = require('../data/projects.json')
let blogs = require('../data/blogs.json')
let pdetails = require('../data/pdetails/details.json');
let bdetails = require('../data/bdetails/details.json');
const fs = require('fs')
const rimraf = require('rimraf')
const filename1 = './data/profile.json'
const filename2 = './data/contact.json'
const filename3 = './data/projects.json'
const filename4 = './data/blogs.json'
const filename5 = './data/pdetails/details.json'
const filename6 = './data/bdetails/details.json'
const helper = require('../helpers/helper.js')

function updateProfile(newPost) {
    return new Promise((resolve, reject) => {
            helper.writeJSONFile(filename1, newPost)
            resolve(newPost)
})
}

function updateProject(id,newPost,imagename) {
    return new Promise((resolve, reject) => {
        console.log(imagename,'mahad1');
        helper.mustBeInArray(projects, id)
        .then(post => {
            const index = projects.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const image = { image:imagename }
            console.log(image,'mahad2')
            projects[index] = { ...id, ...newPost, ...image }
            helper.writeJSONFile(filename3, projects)
            resolve(projects)
        })
        .catch(err => reject(err))
})
}

function insertProject(newPost,imagename) {
    return new Promise((resolve, reject) => {
        const id = { id: `${helper.getNewId(projects)}` }
        
        newPost = { ...id, ...newPost,image:imagename }
        projects.push(newPost)
        helper.writeJSONFile(filename3, projects)
        resolve(projects)
    })
}

function updateBlog(id,newPost,imagename) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(blogs, id)
        .then(post => {
            const index = blogs.findIndex(p => p.id == post.id)
            id = { id: post.id }
            blogs[index] = { ...id, ...newPost,image:imagename }
            helper.writeJSONFile(filename4, blogs)
            resolve(blogs)
        })
        .catch(err => reject(err))
})
}

function insertBlog(newPost,imagename) {
    return new Promise((resolve, reject) => {
        const id = { id: `${helper.getNewId(blogs)}` }
        
        newPost = { ...id, ...newPost,image:imagename }
        blogs.push(newPost)
        helper.writeJSONFile(filename4, blogs)
        resolve(blogs)
    })
}

function updatePdetail(i,id,newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(pdetails[id-1].pdetails, i)
        .then(post => {
            const index = pdetails[id-1].pdetails.findIndex(p => p.id == post.id)
            i = { id: post.id }
            pdetails[id-1].pdetails[index] = { ...i, ...newPost }
            helper.writeJSONFile(filename5, pdetails)
            resolve(pdetails[id-1].pdetails)
        })
        .catch(err => reject(err))
})
}


function insertPdetail(newPost,imagesname) {
    return new Promise((resolve, reject) => {
        const id = { id: `${helper.getNewId(pdetails)}` }
        const detail = {
            ...id,
            images:imagesname,
            pdetails:[
                {
                    id: "1",
                    content: newPost.content1
                },
                {
                    id: "2",
                    content: newPost.content2
                },
                {
                    id: "3",
                    content: newPost.content3
                }
            ]
        }
        pdetails.push(detail)
        helper.writeJSONFile(filename5, pdetails)
        resolve(projects)
    })
}


function updateBdetail(i,id,newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(bdetails[id-1].bdetails, i)
        .then(post => {
            const index = bdetails[id-1].bdetails.findIndex(p => p.id == post.id)
            i = { id: post.id }
            bdetails[id-1].bdetails[index] = { ...i, ...newPost }
            helper.writeJSONFile(filename6, bdetails)
            resolve(bdetails[id-1].bdetails)
        })
        .catch(err => reject(err))
})
}

function insertBdetail(newPost,imagesname) {
    return new Promise((resolve, reject) => {
        const id = { id: `${helper.getNewId(bdetails)}` }
        const detail = {
            ...id,
            images:imagesname,
            bdetails:[
                {
                    id: 1,
                    content: newPost.content1
                },
                {
                    id: 2,
                    content: newPost.content2
                },
                {
                    id: 3,
                    content: newPost.content3
                }
            ]
        }
        bdetails.push(detail)
        helper.writeJSONFile(filename6, bdetails)
        resolve(blogs)
    })
}

function updateContact(newPost) {
    return new Promise((resolve, reject) => {
            helper.writeJSONFile(filename2, newPost)
            resolve(newPost)
})
}

function deleteProject(id,path1,path2) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(projects, id)
        .then(() => {
            const imag = projects.filter(p => parseInt(p.id) == parseInt(id))
            console.log(imag,'hara hara')
            const imagename = imag[0].image
            console.log(imagename,'siva siva')
            fs.unlink(path1+'/'+imagename+'.svg',(err)=>{
                console.log(err);
            })
            
            projects = projects.filter(p => parseInt(p.id) !== parseInt(id))
            console.log(projects,"madman")
            helper.writeJSONFile(filename3, projects)
            resolve(projects)
        })
        .catch(err => reject(err))
        helper.mustBeInArray(pdetails, id)
        .then(() => {
            console.log(path2+'/'+'images'+`${id}`,'pathof');
            rimraf(path2+'/'+'images'+`${id}`,(err)=>{
                console.log(err);
            })
            pdetails = pdetails.filter(p => parseInt(p.id) !== parseInt(id))
            helper.writeJSONFile(filename5, pdetails)
            console.log(pdetails)
        })
        .catch(err => console.log(err))
    })
}



// const fs = require('fs')
// const rimraf = require('rimraf')
// fs.unlink('./public/bimage/image1.svg',(err)=>{
//     console.log(err);
// })
// rimraf('./public/pdetail/images1',(err)=>{
//     console.log(err);
// })

function deleteBlog(id,path1,path2) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(blogs, id)
        .then(() => {
            const image = blogs.filter(p => parseInt(p.id) == parseInt(id))
            // console.log(image,'devan')
            const imagename = image[0].image
            fs.unlink(path1+'/'+imagename+'.svg',(err)=>{
                console.log(err);
            })
            blogs = blogs.filter(p => parseInt(p.id) !== parseInt(id))
            console.log(blogs)
            helper.writeJSONFile(filename4, blogs)
            resolve(blogs)
        })
        .catch(err => reject(err))
        helper.mustBeInArray(bdetails, id)
        .then(() => {
            console.log(path2+'/'+'images'+`${id}`,'pathof');
            rimraf(path2+'/'+'images'+`${id}`,(err)=>{
                console.log(err);
            })
            bdetails = bdetails.filter(p => parseInt(p.id) !== parseInt(id))
            helper.writeJSONFile(filename6, bdetails)
            console.log(bdetails)
        })
        .catch(err => console.log(err))
    })
}

module.exports = {
    updateProfile,
    updateContact,
    updateProject,
    updateBlog,
    updatePdetail,
    updateBdetail,
    insertProject,
    insertBlog,
    insertPdetail,
    insertBdetail,
    deleteProject,
    deleteBlog
}


