const { User, Post, Comment } = require("../models");

module.exports = {
  // content 가져올 때 댓글도 가져옴, 댓글만 따로 가져올 일이 없음
  post: async (req, res) => {
    // console.log('req.body', req.body) // { writer: 'test', comment: '123' }
    // console.log('req.session.userId>>>>',req.session.userId)
    const { userId } = req.session;
    const { postId, comment } = req.body;

    if (userId && postId && comment) {
      const postComment = await Comment.create({
        userId: req.session.userId,
        postId: req.body.postId,
        content: req.body.comment,
      });
      // console.log("🚀 ~ file: comment.js ~ line 14 ~ post: ~ postComment", postComment)
      // 댓글 작성자 찾기 위한 userId, postId => postComment.dataValues.userId, postComment.dataValues.postId

      // !
      // 댓글 작성자: commentUser.dataValues.User.dataValues.name
      // 내용: postComment.dataValues.content
      // 작성일: postComment.dataValues.createdAt
      const commentUser = await Comment.findOne({
        include: [
          {
            model: User,
          },
        ],
        where: {
          userId: postComment.dataValues.userId,
          postId: postComment.dataValues.postId,
        },
      });

      const commentWriter = commentUser.dataValues.User.dataValues.name;
      const commentBody = postComment.dataValues.content;
      const commentCreatedAt = postComment.dataValues.createdAt;

      // console.log("🚀 ~ file: comment.js ~ line 28 ~ post: ~ commentUser", commentUser.dataValues.User.dataValues.name)
      //! 테스트 필요
      if (commentWriter && commentBody && commentCreatedAt) {
        res.status(201).json({
          commentWriter,
          commentBody,
          commentCreatedAt,
        });
      }
    } else {
      res.status(400).json({
        message: "Bad Request",
      });
    }
  },
  patch: async (req, res) => {},
  delete: async (req, res) => {},
};
