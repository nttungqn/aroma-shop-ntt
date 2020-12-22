const User = require('./../models/userModel');

module.exports.getAccount = (req, res) => {
    res.status(200).render('user-profile', {
        banner: `User profile`,
        user: req.user
    })
}

module.exports.postAccount = (req, res, next) => {
    const updateInfo = req.body;
    const user = User.findByIdAndUpdate(req.user.id, updateInfo);
    
    if(!user){
        next(new AppError('Update user not successful', 404));
    }
    
    res.status(200).render('user-profile', {
        banner: `User profile`,
        user: req.user,
        type: true
    })
}