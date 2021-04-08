const { User, Pet } = require("../models");

module.exports = {
    post: async (req, res) => {
        try{
            const { name, email, password, petName, petBreed   } = req.body;
            console.log("🚀 ~ file: signup.js ~ line 7 ~ post: ~ email", email)
            console.log("🚀 ~ file: signup.js ~ line 7 ~ post: ~ petBreed", petBreed)
            console.log("🚀 ~ file: signup.js ~ line 7 ~ post: ~ petName", petName)
            if (name && email && password) {
                const [user, created] = await User.findOrCreate({
                    where: {
                        email
                    },
                    defaults: {
                        name,
                        email,
                        password   
                    }
                })
                // console.log("🚀 ~ file: signup.js ~ line 20 ~ post: ~ user", user)
                // User {
                //   dataValues: {
                //     id: 9,
                //     name: 'pet6',
                //     email: 'pet6@pet.com',
                //     password: '12345678',
                //     updatedAt: 2021-04-08T13:07:25.368Z,
                //     createdAt: 2021-04-08T13:07:25.368Z
                //   },

            if (petName && petBreed) {
                const pet = await Pet.create({
                        userId: user.dataValues.id,
                        name: petName,
                        breed: petBreed,
                })
            }
            // console.log("🚀 ~ file: signup.js ~ line 33 ~ post: ~ pet", pet)
            // Pet {
            //   dataValues: {
            //     id: 1,
            //     userId: 9,
            //     name: 'pet6',
            //     breed: '시베리안 허스키',
            //     updatedAt: 2021-04-08T13:07:25.381Z,
            //     createdAt: 2021-04-08T13:07:25.381Z
            //   },
                
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
