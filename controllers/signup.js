const { User } = require("../models");

module.exports = {
    post: async (req, res) => {
        try{
            const { name, email, password } = req.body;
            if (name && email && password) {
                const [user, created] = await User.findOrCreate({
                    where: {
                        email
                    },
                    default: {
                        name,
                        email,
                        password   
                    }
                })
                console.log("🚀 ~ file: signup.js ~ line 18 ~ post: ~ user", user)
                console.log("🚀 ~ file: signup.js ~ line 9 ~ post: ~ created", created)
                if (!created) {
                    res.status(409).json({
                        message: 'This account exists.'
                    })
                } else {
                    res.status(201).json({
                        message: 'Created'
                    })
                }
        }
    }
        catch(err) {
            console.error(err)
        }
    }
}
