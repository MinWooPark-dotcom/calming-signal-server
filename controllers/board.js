const { Post,User } = require('../models');

module.exports = {
    get: async (req, res) => {
        try{
            let data = []
            
            const postData = await Post.findAll({
            })

            if (postData.length !== 0) {
                for (let i = 0; i < postData.length; i++) {
                    const writer = await Post.findAll({
                        include: [{
                            model: User,
                            required: false,
                            attributes: ['name']
                        }]
                    })
                    // console.log("🚀 ~ file: board.js ~ line 23 ~ get: ~ writer", writer[0].User.dataValues) //  { name: 'demo-user' }

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
        } catch(err) {
            console.error(err)
        }
    }
}