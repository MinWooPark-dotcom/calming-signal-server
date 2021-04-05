const { User, Post } = require("../models");

module.exports = {
    get: async (req, res) => {
        // console.log('p',req.params)
        // console.log('q',req.query)
        
        const contentId = req.query.id
        if (contentId) {
            const getContent = await Post.findOne({
                include:[{
                    model: User
                }],
                where: {
                    id: contentId
                }
            })
            // console.log("🚀 ~ file: content.js ~ line 15 ~ get: ~ getContent", getContent.dataValues)

            const userName = getContent.dataValues.User.dataValues.name
            // console.log("🚀 ~ file: content.js ~ line 21 ~ get: ~ getUserName", userName)

            res.status(200).json({
            title: getContent.dataValues.title,
            content: getContent.dataValues.content,
            category: getContent.dataValues.category,
            numOfViews: getContent.dataValues.numOfViews,
            createdAt: getContent.dataValues.createdAt,
            userName
            })
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
    }
}
