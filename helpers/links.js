// requiring the dependencies needed
const urlExists = require('url-exists')
let db       = require('../models'),
    validUrl = require('valid-url')

//creating functions to help handle the linkRoutes 

exports.displayAdminLinks = async (req, res)=>{
    let foundAdmin = await db.Admin.findById(req.params.id)
            .then((foundAdmin)=>{
                res.status(200).json(foundAdmin.links)
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
    let baseUrl = 'http://localhost:7777/'
    let shortenedUrl = `${shortUrl(string)}`

    const adminId = req.params.id

    let longUrl = req.body.longUrl

    urlExists(longUrl, async(err, exists)=>{
        if(exists){
            let newLink = await db.Links.create({longUrl: req.body.longUrl, shortUrl: shortenedUrl, adminId: req.params.id })
                .then((newlink)=>{
                    db.Admin.findById(req.params.id).then((foundAdmin)=>{
                        foundAdmin.links.push(newlink._id)
                        foundAdmin.save().then((foundAdmin)=>{
                            db.Links.findById(newlink._id)
                                .populate('adminId', {email: true})
                     })
                })
                res.json(newlink)
            })
        }else{
            res.status(404).json({message: 'The provided Url is an invalid Url'})
        }

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

// delete link for database and also from admins links array
exports.deleteLink = async (req, res)=>{
    // find link by id and remove
    let deletedLink = await db.Links.findByIdAndRemove(req.params.linkId)
            .then((deletedLink)=>{
                // find admin associated with link
                db.Admin.findById(deletedLink.adminId)
                    .then((foundAdmin)=>{
                        // looping through the admin link array to find id of deleted link
                        for(i = 0; i <= foundAdmin.links.length; i++){
                            if(foundAdmin.links[i] == deletedLink.id){
                                // splicing deleted link out of the adminlinks array
                               foundAdmin.links.splice(foundAdmin.links.indexOf(foundAdmin.links[i]), 1)
                               foundAdmin.save()
                             }else{
                                 console.log('if statement not correspondin')
                             }
                        }
                    })
                res.json({message: `the link with id: ${deletedLink.id} has been deleted successfully`})
            })
            .catch((err)=>{
                res.json({message: 'An error occured while trying to delete link'})
            })
}


// exporting all functions to handle the linkRoutes
module.exports = exports