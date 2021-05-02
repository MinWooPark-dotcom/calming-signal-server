const crypto = require("crypto");
const { User, Pet, Location } = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { name, email, petName, petBreed, city } = req.body;

      if (name && email && req.body.password) {
        crypto.randomBytes(64, (err, buf) => {
          const salt = buf.toString("base64");
          crypto.pbkdf2(
            req.body.password,
            salt,
            100000,
            64,
            "sha512",
            async (err, key) => {
              let password = key.toString("base64");
              //! 유저가 지역 설정했다면 가입 시 locationId 넣기
              if (city) {
                const getLocationId = await Location.findOne({
                  where: {
                    name: city,
                  },
                });

                if (getLocationId.dataValues.id) {
                  const [user, created] = await User.findOrCreate({
                    where: {
                      email,
                    },
                    defaults: {
                      name,
                      email,
                      password,
                      salt,
                      locationId: getLocationId.dataValues.id,
                    },
                  });
                  if (petName && petBreed) {
                    const pet = await Pet.create({
                      userId: user.dataValues.id,
                      name: petName,
                      breed: petBreed,
                    });
                  }

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
              // ! 지역 설정 안 했을 경우
              else {
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
                if (petName && petBreed) {
                  const pet = await Pet.create({
                    userId: user.dataValues.id,
                    name: petName,
                    breed: petBreed,
                  });
                }

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
      }
    } catch (err) {
      console.error(err);
    }
  },
};
