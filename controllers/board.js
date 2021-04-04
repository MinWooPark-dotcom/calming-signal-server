const { Post,User } = require('../models');
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res) => {
        console.log('req.params','req.query',req.params, req.query) // { category: 'free' } { page: '1' }
        try{
            const getPostData = async (pageNum, boardCategory) => {
            const postData = await Post.findAll({
                where: {
                    //    id: {[Op.lte]: 10} // <= 10
                    // ex) id: { [Op.in]: [1,2,3] }   
                    id: {[Op.between]: [pageNum-1, pageNum+9]}, 
                },
            })

            let data = []

            if (postData.length !== 0) { 
                const writer = await Post.findAll({
                    include: [{
                        model: User,
                        required: false,
                        // where: {
                            // id:  postData[i].dataValues.userId
                            // ex) id: { [Op.in]: [1,2,3] }   
                            // id: {[Op.lte]: 10} // <= 10
                        // },
                            attributes: ['name']
                        }]
                    })
                        // console.log("🚀 ~ file: board.js ~ line 20 ~ get: ~ writer", writer)
                        // console.log("🚀 ~ file: board.js ~ line 23 ~ get: ~ writer", writer[0].User.dataValues) //  { name: 'demo-user' }
                        
                for (let i = 0; i < postData.length; i++) {
                        let obj = {}
                        obj['num'] = postData[i].dataValues.id
                        obj['title'] = postData[i].dataValues.title
                        obj['content'] = postData[i].dataValues.content
                        obj['category'] = postData[i].dataValues.category
                        obj['writer'] = writer[i].User.dataValues.name
                        obj['numOfViews'] = postData[i].dataValues.numOfViews
                        obj['createdAt'] = postData[i].dataValues.createdAt
                        data.push(obj)
                }
                res.status(200).json({
                    data,                 
                })
            } else {
                res.status(404).json({           
                    message: 'Not found'
                })
            }
        }
        const pageNum = Number(req.query.page)
        const boardCategory = req.params.category
        getPostData(pageNum, boardCategory)
     } catch(err) {
            console.error(err)
        }
    }
}