const { Post,User, Comment } = require('../models');
const { Op } = require('sequelize')

module.exports = {
    get: async (req, res) => {
        console.log('req.session.useId>>>>?', req.session.useId)
        // console.log('req.params','req.query',req.params, req.query) // { category: 'free' } { page: '1' }
        try{
            const getPostData = async (pageNum, boardCategory) => {
            //! 해당 카테고리 총 페이지 수 구하기: 게시판 페이지 수 제한하기 위함
            const numOfPosts = await Post.findAll({    
                where: {
                    //    id: {[Op.lte]: 10} // <= 10
                    // ex) id: { [Op.in]: [1,2,3] }   
                    // id: {[Op.between]: [pageNum-1, pageNum+9]},                     
                    category: boardCategory
                },
            })
            // console.log("🚀 ~ file: board.js ~ line 18 ~ getPostData ~ numOfPosts", numOfPosts.length)

            // ! 해당 카테고리 게시글 모두 찾기, 10개 제한해서 카테고리 페이지 당 10개만 보여주기
            const postData = await Post.findAll({
                where: {
                    //    id: {[Op.lte]: 10} // <= 10
                    // ex) id: { [Op.in]: [1,2,3] }   
                    // id: {[Op.between]: [pageNum-1, pageNum+9]},                     
                    category: boardCategory
                },
                limit: 10,
                offset: pageNum
            })
            console.log("🚀 ~ file: board.js ~ line 31 ~ getPostData ~ postData", postData)

            if (postData.length !== 0) { 
                //! 게시글 각 작성자 찾기
                const writer = await Post.findAll({
                    include: [{
                        model: User,
                        required: false, // left join
                        // User테이블에 where조건 넣음
                        where: {
                            // id:  postData[i].dataValues.userId
                            // ex) id: { [Op.in]: [1,2,3] }   
                            // id: {[Op.lte]: 10} // <= 10
                        },            
                            attributes: ['name']
                        },{
                            model: Comment,
                            require: false,
                            attributes: ['title', 'content']
                        }],
                    where: {
                        category: boardCategory
                        },
                        limit: 10,
                        offset: pageNum    
                    })
                        console.log("🚀 ~ file: board.js ~ line 55 ~ getPostData ~ writer", writer.length)
                        // console.log("🚀 ~ file: board.js ~ line 20 ~ get: ~ writer", writer[0].Comments[0].dataValues) // { title: '11', content: '1111' }
                        // console.log("🚀 ~ file: board.js ~ line 23 ~ get: ~ writer", writer[5].User.dataValues) //  { name: 'demo-user' }
                let data = []
                
                
                for (let i = 0; i < postData.length; i++) {
                        let obj = {}
                        obj['id'] = postData[i].dataValues.id
                        obj['num'] = i+1
                        obj['title'] = postData[i].dataValues.title
                        obj['content'] = postData[i].dataValues.content
                        obj['category'] = postData[i].dataValues.category
                        obj['numOfViews'] = postData[i].dataValues.numOfViews
                        obj['createdAt'] = postData[i].dataValues.createdAt
                        obj['writer'] = writer[i].User.dataValues.name
                        data.push(obj)
                    }

                res.status(200).json({
                    data,                 
                    numOfPages: parseInt(numOfPosts.length / 10),
                    reminingNum : numOfPosts.length % 10
                })
            } else {
                res.status(404).json({           
                    message: 'Not found'
                })
            }
        }
        const pageNum = Number(req.query.page) > 1 ?  Number(req.query.page) * 10 - 10: 0
        // console.log("🚀 ~ file: board.js ~ line 58 ~ get: ~ pageNum", pageNum)
        const boardCategory = req.params.category
        // console.log("🚀 ~ file: board.js ~ line 59 ~ get: ~ boardCategory", boardCategory)
        getPostData(pageNum, boardCategory)
     } catch(err) {
            console.error(err)
        }
    },
    post: async (req, res) => {
        console.log('req.session.userId', req.session.userId)
        console.log(req.body)  
        const title = req.body.title;
        const content = req.body.content;
        const category = req.body.category;

        const registerPost = await Post.create({
            userId: req.session.userId,
            title,
            content,
            category
        })
        // console.log("🚀 ~ file: board.js ~ line 80 ~ post: ~ registerPost", registerPost)
        
        if(registerPost) {
            res.status(201).json({
                message: 'Created'                 
            })
        } else {
            res.status(400).json({
                message: 'Bad request'                 
            })
        }
    }
}