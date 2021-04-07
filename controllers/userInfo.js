const { User } = require('../models');

module.exports = {
    get: async (req, res) => {
        const {userId} = req.session
        console.log('userId>>>>>', userId)
        try{
            const userInfo = await User.findOne({
                where: {
                    id: userId
                }
            })
            console.log("🚀 ~ file: userInfo.js ~ line 12 ~ get: ~ userInfo", userInfo)
            res.status(200).json({
                email: userInfo.dataValues.email,
                name: userInfo.dataValues.name
            })
        }
        catch(err) {
            console.error(err)
        }
    }
}