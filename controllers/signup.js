const crypto = require("crypto");
const { User, Pet } = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { name, email, petName, petBreed } = req.body;
      crypto.randomBytes(64, (err, buf) => {
        const salt = buf.toString("base64");
        crypto.pbkdf2(
          req.body.password,
          salt,
          100000,
          64,
          "sha512",
          async (err, key) => {
            // console.log("password:", key.toString("base64"));
            let password = key.toString("base64");
            if (name && email && password) {
              const [user, created] = await User.findOrCreate({
                where: {
                  email,
                },
                defaults: {
                  name,
                  email,
                  password,
                  salt,
                },
              });
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
                });
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
                  message: "This account exists.",
                });
              } else {
                res.status(201).json({
                  message: "Created",
                });
              }
            }
          }
        );
      });
    } catch (err) {
      console.error(err);
    }
  },
};
