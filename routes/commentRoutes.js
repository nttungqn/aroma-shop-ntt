const express = require('express');
const router = express.Router();
const commentController = require('./../controllers/commentController');

router.post('/', (req, res, next) => {
    let comment = {
        userId: req.user._id,
        productId: req.body.productId,
        message: req.body.message,
    }
    comment.parentCommentId = req.body.parentCommentId == '' ? undefined : req.body.parentCommentId;

    commentController.add(comment)
    .then(data => {
        console.log(data);
        return res.redirect('/products/' + data.productId)})
    .catch(error => next(error));
});

module.exports = router;