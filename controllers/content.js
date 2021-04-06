const { User, Post, Comment } = require("../models");

module.exports = {
    get: async (req, res) => {
        // console.log('p',req.params)
        // console.log('q',req.query)
        
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
            
            // ! 본문 글 작성자
            const userName = getContent.dataValues.User.dataValues.name
            
            // ! 댓글 제목, 내용 
            const commentArr = getContent.dataValues.Comments.map((el) => el.dataValues);

            // ! 댓글 제목, 내용 전부 가져와서 배열에 담음
            const commentUserIdArr = getContent.dataValues.Comments.map((el) => el.dataValues.userId);
            // console.log("🚀 ~ file: content.js ~ line 23 ~ get: ~ commentUserIdArr", commentUserIdArr) // [1, 1, 2]
            
            // ! 댓글 작성자 찾기 
            const commentUser = await User.findAll({
                include:[{
                    model: Comment
                }],
                where: {
                    id: commentUserIdArr
                }
            })
            
            const commentUserArr = commentUser.map(el => el.dataValues)
            console.log("🚀 ~ file: content.js ~ line 42 ~ get: ~ commentUserArr", commentUserArr)

            const commentData = [];

            res.status(200).json({
            // title: getContent.dataValues.title,
            // content: getContent.dataValues.content,
            // category: getContent.dataValues.category,
            // numOfViews: getContent.dataValues.numOfViews,
            // createdAt: getContent.dataValues.createdAt,
            // userName,
            // commentUserArr
            a : 'a'
            })
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
    }
}
