const { User, Post, Comment } = require('../models');

module.exports = {
    get: async (req, res) => {

    },
    post: async (req, res) => {
        // console.log('req.body', req.body) // { writer: 'test', comment: '123' }
        // console.log('req.session.userId>>>>',req.session.userId)
        const postComment = await Comment.create({
            userId: req.session.userId,
            postId: req.body.postId,
            content: req.body.comment
        })
        // console.log("🚀 ~ file: comment.js ~ line 14 ~ post: ~ postComment", postComment)
        // 댓글 작성자 찾기 위한 userId, postId => postComment.dataValues.userId, postComment.dataValues.postId
        
        // !
        // 댓글 작성자: commentUser.dataValues.User.dataValues.name
        // 내용: postComment.dataValues.content
        // 작성일: postComment.dataValues.createdAt
        const commentUser = await Comment.findOne({
            include:[{
                model: User
            }],
            where: {
                userId: postComment.dataValues.userId,
                postId: postComment.dataValues.postId
            }
        })
        
        const commentWriter = commentUser.dataValues.User.dataValues.name;
        const commentBody = postComment.dataValues.content;
        const commentCreatedAt = postComment.dataValues.createdAt;
        
        // console.log("🚀 ~ file: comment.js ~ line 28 ~ post: ~ commentUser", commentUser.dataValues.User.dataValues.name)
        res.status(201).json({
            commentWriter,
            commentBody,
            commentCreatedAt
        })
    },
    patch: async (req, res) => {

    }
}