const express = require('express')
const app = express()

const projects = require('./projects')
const blogs = require('./blogs')
const contact = require('./contact')
const profile = require('./profile')
const form = require('./form')

module.exports=[projects,blogs,contact,profile,form]