// requiring the dependencies needed
let db = require('../models')

//creating functions to help handle the linkRoutes 

exports.displayAllLinks = (req, res)=>{
    res.json({message: 'all links will be displayed here'})
}

exports.createNewLink = (req, res)=>{
    res.json({message: 'A newly created link will be posted to this route'})
}

exports.showLinkMoreInfo = (req, res)=>{
    res.json({message: 'An indivial link will be displayed based on id passed'})
}

exports.updateLink = (req, res)=>{
    res.json({message: 'A link will be updated from this route'})
}

exports.deleteLink = (req, res)=>{
    res.json({message: 'A link will be deleted from this route'})
}


// exporting all functions to handle the linkRoutes
module.exports = exports