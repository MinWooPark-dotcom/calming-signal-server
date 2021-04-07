const { User } = require("../models");

module.exports = {
    post: async (req, res) => {
        try{
            const { email, password } = req.body;
            // console.log("🚀 ~ file: signin.js ~ line 7 ~ post: ~ email", email)
            // console.log("🚀 ~ file: signin.js ~ line 7 ~ post: ~ password", password)

            if (email && password) {
                const userInfo = await User.findOne({
                    where: { email, password }
                  });
                
                  // ! console.log("🚀 ~ file: login.js ~ line 11 ~ post: ~ userInfo", userInfo)     
                // ? User {
                //    dataValues: {
                //       id: 1,
                //       email: 'demo@demo.com',
                //       password: '12345678',
                //       name: 'demo-user',
                //       createdAt: 2021-04-02T05:14:53.000Z,
                //       updatedAt: 2021-04-02T05:14:53.000Z
                // ?    },           

                if(!userInfo) {
                    res.status(400).json({ message: "Not authorized"})
                } else{
                    req.session.userId = userInfo.dataValues.id // primary key
                    res.status(200).json({
                        message: "OK"
                        // message: userInfo.dataValues.id
                    })
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }
}
