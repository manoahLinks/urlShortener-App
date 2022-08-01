// requiring the dependencies needed
let db = require('../models')

//creating functions to help handle the linkRoutes 

exports.displayAdminLinks = async (req, res)=>{
    let foundAdmin = await db.Admin.findById(req.params.id)
            .then((foundAdmin)=>{
                res.json(foundAdmin.links)
            })
            .catch((err)=>{
                res.json({message: 'could not find the links for this admin'})
            })
}

// creating a newlink function
exports.createNewLink = async (req, res)=>{
    let body = req.body
    // creating a shortUrl function to generate random string
    const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'   
    let shortUrl = (x)=>{
        let len = 5
        urlArray = []
        for(i = 0; i <= len; i++){
            urlArray.push(string.charAt(Math.floor(Math.random() * string.length)))
        }
        const newUrl = urlArray.join('')
        return newUrl
    }
    // calling the shortUrl function and adding to database
    let shortenedUrl = shortUrl(string)

    const adminId = req.params.id

    // creating a newlink in the database
    let newLink = await db.Links.create({longUrl: req.body.longUrl, shortUrl: shortenedUrl, adminId: req.params.id })
        .then((newlink)=>{
            db.Admin.findById(req.params.id).then((foundAdmin)=>{
                foundAdmin.links.push(newlink.id)
                foundAdmin.save().then((foundAdmin)=>{
                    db.Links.findById(newlink._id)
                        .populate('adminId', {email: true})
                })
            })
            res.json(newlink)
        })
 
}

// show more info about a link

exports.showLinkMoreInfo = async (req, res)=>{
   let foundLink = await db.Links.findById(req.params.linkId)
        .then((foundLink)=>{
            res.json(foundLink)
        })
        .catch((err)=>{
            res.json({message: 'could not display link information'})
        })
}

exports.updateLink = async (req, res)=>{
    let updatedLink = await db.Links.findOneAndUpdate(req.params.linkId, req.body)
            .then((updatedLink)=>{
                res.json(updatedLink)
            })
            .catch((err)=>{
                res.json({message: 'there was an error n updatng link'})
            })
}

exports.deleteLink = async (req, res)=>{
    let deletedLink = await db.Links.findByIdAndRemove(req.params.linkId)
            .then((deletedLink)=>{
                res.json({message: `the link with id: ${deletedLink.id} has been deleted successfully`})
            })
            .catch((err)=>{
                res.json({message: 'An error occured while trying to delete link'})
            })
}


// exporting all functions to handle the linkRoutes
module.exports = exports