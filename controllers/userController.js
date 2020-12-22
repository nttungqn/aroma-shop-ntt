const User = require('./../models/userModel');

module.exports.getAccount = (req, res) => {
    res.status(200).render('user-profile', {
        banner: `User profile`,
        user: req.user
    })
}

module.exports.postAccount = (req, res) => {
    
}