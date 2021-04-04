let projects = require('../data/projects.json')
let blogs = require('../data/blogs.json')
let pdetails = require('../data/pdetails/details.json');
let bdetails = require('../data/bdetails/details.json');
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

function updateProject(id,newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(projects, id)
        .then(post => {
            const index = projects.findIndex(p => p.id == post.id)
            id = { id: post.id }
            projects[index] = { ...id, ...newPost }
            helper.writeJSONFile(filename3, projects)
            resolve(projects)
        })
        .catch(err => reject(err))
})
}

function updateBlog(id,newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(blogs, id)
        .then(post => {
            const index = blogs.findIndex(p => p.id == post.id)
            id = { id: post.id }
            blogs[index] = { ...id, ...newPost }
            helper.writeJSONFile(filename4, blogs)
            resolve(blogs)
        })
        .catch(err => reject(err))
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

function updateContact(newPost) {
    return new Promise((resolve, reject) => {
            helper.writeJSONFile(filename2, newPost)
            resolve(newPost)
})
}



module.exports = {
    updateProfile,
    updateContact,
    updateProject,
    updateBlog,
    updatePdetail,
    updateBdetail
}