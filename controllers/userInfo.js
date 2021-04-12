const { User, Pet } = require('../models');

module.exports = {
    get: async (req, res) => {
        const {userId} = req.session
        console.log('userId>>>>>', userId)
        try{
            const userInfo = await User.findOne({
                include:[{
                    model: Pet
                }],
                where: {
                    id: userId
                }
            })
            console.log("🚀 ~ file: userInfo.js ~ line 16 ~ get: ~ userInfo", userInfo.Pets[0])
            //! 테스트 해 봐야함
            if (userInfo) {                
                if (userInfo.Pets.length !== 0) {
                    console.log('if (userInfo.Pets[0].dataValues) {')
                    res.status(200).json({
                        email: userInfo.dataValues.email,
                        name: userInfo.dataValues.name,
                        petName: userInfo.Pets[0].dataValues.name,
                        petBreed: userInfo.Pets[0].dataValues.breed
                    })
                } else {
                     res.status(200).json({
                        email: userInfo.dataValues.email,
                        name: userInfo.dataValues.name,
                    })
                }
            } else {
                res.status(401).json({
                    message: "Unauthorized"
                })
            }
        }
        catch(err) {
            console.error(err)
        }
    }
}