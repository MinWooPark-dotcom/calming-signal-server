const { User, Pet } = require("../models");
const crypto = require("crypto");

module.exports = {
  patch: async (req, res) => {
    const { userId } = req.session;
    const { category } = req.params;
    // console.log("🚀 ~ file: mypage.js ~ line 10 ~ post: ~ category", category); // password
    const {
      email,
      prevPassword,
      newPassword,
      newName,
      newPetName,
      prevPetBreed,
      newPetBreed,
    } = req.body;

    //! 비밀번호 변경
    if (category === "password") {
      const getSalt = await User.findOne({
        where: {
          email,
        },
      });

      let salt = getSalt.dataValues.salt;

      crypto.pbkdf2(
        prevPassword,
        salt,
        100000,
        64,
        "sha512",
        async (err, key) => {
          // console.log("password:", key.toString("base64"));
          //!  이전 암호 구함
          let getPrevPassword = key.toString("base64");
          //! 예전 비밀번호 맞는지 확인
          const isPrevPassword = await User.findOne({
            where: {
              email,
              password: getPrevPassword,
            },
          });
          if (isPrevPassword) {
            // ! 새로운 비밀번호 해싱
            crypto.randomBytes(64, (err, buf) => {
              const newSalt = buf.toString("base64");
              crypto.pbkdf2(
                newPassword,
                newSalt,
                100000,
                64,
                "sha512",
                async (err, key) => {
                  let getNewPassword = key.toString("base64");
                  const getUser = await User.update(
                    {
                      password: getNewPassword,
                      salt: newSalt,
                    },
                    {
                      where: {
                        email,
                        password: getPrevPassword,
                      },
                    }
                  );
                  console.log(
                    "🚀 ~ file: mypage.js ~ line 51 ~ getUser",
                    getUser
                  );
                  if (getUser) {
                    res.status(200).json({
                      message: "OK",
                    });
                  } else {
                    res.status(401).json({ message: "Unauthorized" });
                  }
                }
              );
            });
          } else {
            res.status(401).json({ message: "Unauthorized" });
          }
        }
      );
    }
    // ! 이름 변경
    else if (category === "username") {
      console.log("newName", newName);
      const changeUserName = await User.update(
        {
          name: newName,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      if (changeUserName) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
    // ! 반려견 이름 변경
    else if (category === "petname") {
      console.log(category);
      console.log(newPetName);
      const changePetName = await Pet.update(
        {
          name: newPetName,
        },
        {
          where: {
            userId,
          },
        }
      );
      if (changePetName) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else if (category === "petbreed") {
      const changePetName = await Pet.update(
        {
          breed: newPetBreed,
        },
        {
          where: {
            userId,
          },
        }
      );
      if (changePetName) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }

    // ! 반려견종 변경
  },
};
