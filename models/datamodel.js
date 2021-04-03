let projects = require('../data/projects.json')
let blogs = require('../data/blogs.json')
const filename1 = './data/profile.json'
const filename2 = './data/contact.json'
const filename3 = './data/projects.json'
const filename4 = './data/blogs.json'
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
            helper.writeJSONFile(filename3, blogs)
            resolve(blogs)
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
    updateBlog
}