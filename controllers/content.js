const { User, Post, Comment } = require("../models");

module.exports = {
    get: async (req, res) => {
        // console.log('p',req.params) // 글 title
        // console.log('q',req.query) // 글 id
        
        const contentId = req.query.id
        if (contentId) {
            const getContent = await Post.findOne({
                include:[{
                    model: User
                },{
                    model: Comment
                }],
                where: {
                    id: contentId
                }
            })
            // console.log("🚀 ~ file: content.js ~ line 20 ~ get: ~ getContent", getContent.User.dataValues)
            
            // ! 댓글 내용
            // console.log("🚀 ~ file: content.js ~ line 20 ~ get: ~ getContent", getContent.Comments[0].content)
            const commentArr = getContent.Comments.map(el => el.content)
            console.log("🚀 ~ file: content.js ~ line 25 ~ get: ~ commentArr", commentArr) // [ '111', '222', '3333' ]
            
            // ! 댓글 작성자 찾기
            const commentUserIdArr = getContent.dataValues.Comments.map((el) => el.dataValues.userId);
        
            const commentUser = await Comment.findAll({
                include:[{
                    model: User
                }],
                where: {
                    userId: commentUserIdArr,
                    postId: getContent.dataValues.id
                }
            })

            // ! 댓글 작성자 순서대로 배열에 담음
            const getCommentUserName = commentUser.map(el => el.dataValues.User.dataValues.name)
            // console.log("🚀 ~ file: content.js ~ line 43 ~ get: ~ getCommentUserName", getCommentUserName) // [ 'test1', 'test1', 'test2' ]
            
            // ! 댓글 작성자, 내용 객체로 만들기 
            const commentData = {
                writer: getCommentUserName,
                content: commentArr
            };

            res.status(200).json({
            userName: getContent.dataValues.User.dataValues.name, // 작성자
            title: getContent.dataValues.title, // 글 제목
            content: getContent.dataValues.content, // 글 내용 
            category: getContent.dataValues.category, // 글 카테고리
            numOfViews: getContent.dataValues.numOfViews, // 글 조회수 
            createdAt: getContent.dataValues.createdAt, // 글 작성일
            commentData // 댓글 작성자, 내용 
            })
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
    }
}
