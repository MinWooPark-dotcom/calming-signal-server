const { User, Pet, Location } = require("../models");
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
      newPetBreed,
      city,
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
      console.log(
        "🚀 ~ file: mypage.js ~ line 103 ~ patch: ~ changeUserName",
        changeUserName
      );
      if (changeUserName[0] === 1) {
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
      console.log(
        "🚀 ~ file: mypage.js ~ line 125 ~ patch: ~ changePetName",
        changePetName
      );
      if (changePetName[0] === 1) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
    // ! 반려견종 변경
    else if (category === "petbreed") {
      const changePetBreed = await Pet.update(
        {
          breed: newPetBreed,
        },
        {
          where: {
            userId,
          },
        }
      );
      console.log(
        "🚀 ~ file: mypage.js ~ line 143 ~ patch: ~ changePetBreed",
        changePetBreed
      );
      if (changePetBreed[0] === 1) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }

    //! 지역 변경
    else if (category === "location") {
      if (city === null) {
        const updatedUser = await User.update(
          {
            locationId: null,
          },
          {
            where: {
              id: userId,
            },
          }
        );
        console.log(
          "🚀 ~ file: mypage.js ~ line 189 ~ patch: ~ updatedUser",
          updatedUser
        );
        if (updatedUser[0] === 1) {
          res.status(200).json({
            message: "OK",
          });
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        console.log("🚀 ~ file: mypage.js ~ line 213 ~ post: ~ city", city);
        const getLocationId = await Location.findOne({
          where: {
            name: city,
          },
        });
        // console.log(
        //   "🚀 ~ file: mypage.js ~ line 175 ~ patch: ~ getLocationId",
        //   getLocationId
        // );
        const updatedUser = await User.update(
          {
            locationId: getLocationId.dataValues.id,
          },
          {
            where: {
              id: userId,
            },
          }
        );
        console.log(
          "🚀 ~ file: mypage.js ~ line 189 ~ patch: ~ updatedUser",
          updatedUser
        );
        if (updatedUser[0] === 1) {
          res.status(200).json({
            message: "OK",
          });
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      }
    }
  },
  post: async (req, res) => {
    const { userId } = req.session;
    const { category } = req.params;
    // console.log("🚀 ~ file: mypage.js ~ line 10 ~ post: ~ category", category); // password
    const { newPetName, newPetBreed } = req.body;
    // ! 반려견 이름 또는 견종 추가
    if (category === "petname") {
      console.log(category);
      console.log(newPetName);
      const changePetName = await Pet.create({
        userId,
        name: newPetName,
      });
      console.log(
        "🚀 ~ file: mypage.js ~ line 125 ~ patch: ~ changePetName",
        changePetName
      );
      if (changePetName) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else if (category === "petbreed") {
      const changePetBreed = await Pet.create({
        userId,
        breed: newPetBreed,
      });
      console.log(
        "🚀 ~ file: mypage.js ~ line 143 ~ patch: ~ changePetBreed",
        changePetBreed
      );
      if (changePetBreed) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }

    // ! 반려견종 변경
  },
  delete: async (req, res) => {
    const { userId } = req.session;
    const { category } = req.params;
    if (category === "petname" || category === "petbreed") {
      const deletePetInfo = await Pet.destroy({
        where: {
          userId,
        },
      });
      console.log(
        "🚀 ~ file: mypage.js ~ line 256 ~ delete: ~ deletePetInfo",
        deletePetInfo
      );
      if (deletePetInfo === 1) {
        res.status(200).json({
          message: "OK",
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  },
};
