const crypto = require("crypto");
const { User } = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const getSalt = await User.findOne({
          where: { email },
        });

        if (!getSalt) {
          res.status(401).json({ message: "Unauthorized" });
        }

        let salt = getSalt.dataValues.salt;

        crypto.pbkdf2(
          password,
          salt,
          100000,
          64,
          "sha512",
          async (err, key) => {
            let getPassword = key.toString("base64");

            if (email && getPassword) {
              const userInfo = await User.findOne({
                where: {
                  email,
                  password: getPassword,
                },
              });

              if (!userInfo) {
                res.status(401).json({ message: "Unauthorized" });
              } else {
                req.session.userId = userInfo.dataValues.id; // primary key
                res.status(200).json({
                  message: "OK",
                });
              }
            } else {
              res.status(401).json({ message: "Unauthorized" });
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  },
};
