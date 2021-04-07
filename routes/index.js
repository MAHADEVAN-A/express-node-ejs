const express = require('express')
const app = express()

const projects = require('./projects')
const blogs = require('./blogs')
const contact = require('./contact')
const profile = require('./profile')
const form = require('./form')
const pdetail = require('./pdetail')
const bdetail = require('./bdetail')
const pdelete = require('./pdelete')
const bdelete = require('./bdelete')

module.exports=[projects,blogs,contact,profile,form,pdetail,bdetail,pdelete,bdelete]