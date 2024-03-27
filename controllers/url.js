const URL = require('../models/url');
const { nanoid } = require('nanoid');

async function handleCreateShortURL(req, res) {
    const body = req.body;
    if(!body.url)   return res.status(404).json({err: 'url is required'});
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.status(201).json({msg: 'creation successful', id: shortID});
}

async function handleGetRedirectURL(req, res){
    const urlShortId = req.params.id;
    const result = await URL.findOneAndUpdate(
        {
            shortId: urlShortId
        }, 
        {
            $push:{
                visitHistory: {timestamp: Date.now()},
            },
        }
    );    
    if(!result) return res.status(404).json({err: "No url with such ID!"});
    res.redirect(result.redirectURL);
}

async function handleGetAnalytics(req, res){
    const urlShortId = req.params.id;
    const result = await URL.findOne({shortId: urlShortId});
    if(!result) return res.status(404).json({err: "No url with such ID!"});
    return res.status(200).json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = { 
    handleCreateShortURL, 
    handleGetRedirectURL,
    handleGetAnalytics
}