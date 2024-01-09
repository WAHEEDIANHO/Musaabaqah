const express = require('express')
const cors = require('cors')

const app = express()

const whitelist = ['http://localhost:8080']
var corsOptionDelegate = (req, cb) => {
    var corsOption

    if(whitelist.indexOf(req.header(option)) !== -1) {
        corsOption = { origin: true}
    }else {
        corsOption = {origin: false}
    }

    cb(null, corsOption)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionDelegate)
// var corsOPtion