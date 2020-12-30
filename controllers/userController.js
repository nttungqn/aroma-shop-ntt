const User = require('./../models/userModel');

module.exports.getAccount = (req, res) => {
    res.status(200).render('user-profile', {
        banner: 'User profile',
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
        banner: 'User profile',
        user: req.user,
        type: true
    })
}

module.exports.getChangePassword = (req, res) => {
    res.status(200).render('change-password', {
        banner: 'Change password',
        user: req.user
    })
}

module.exports.postChangePassword = async (req, res, next) => {
    const {currentPassword, newPassword, confirmPassword} = req.body;
    const user = req.user;
    let type = await User.correctPassword(currentPassword, user.password);
    
    if(type) {
        await User.findByIdAndUpdate({_id: user._id,}, {password: newPassword})
    }
        
    res.status(200).render('user-profile', {
        banner: 'change-password',
        user,
        type
    })
}