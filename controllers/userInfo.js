const { User, Pet, Location } = require("../models");

module.exports = {
  get: async (req, res) => {
    const { userId } = req.session;
    try {
      const userInfo = await User.findOne({
        include: [
          {
            model: Pet,
          },
          {
            model: Location,
          },
        ],
        where: {
          id: userId,
        },
      });

      if (userInfo) {
        if (
          userInfo.dataValues.Pets.length !== 0 &&
          userInfo.dataValues.Location !== null
        ) {
          res.status(200).json({
            email: userInfo.dataValues.email,
            name: userInfo.dataValues.name,
            petName: userInfo.Pets[0].dataValues.name,
            petBreed: userInfo.Pets[0].dataValues.breed,
            location: userInfo.dataValues.Location.name,
          });
        } else if (
          userInfo.dataValues.Pets.length === 0 &&
          userInfo.dataValues.Location !== null
        ) {
          res.status(200).json({
            email: userInfo.dataValues.email,
            name: userInfo.dataValues.name,
            location: userInfo.Location.name,
          });
        } else if (
          userInfo.dataValues.Pets.length !== 0 &&
          userInfo.dataValues.Location === null
        ) {
          res.status(200).json({
            email: userInfo.dataValues.email,
            name: userInfo.dataValues.name,
            petName: userInfo.Pets[0].dataValues.name,
            petBreed: userInfo.Pets[0].dataValues.breed,
          });
        } else if (
          userInfo.dataValues.Pets.length === 0 &&
          userInfo.dataValues.Location === null
        ) {
          res.status(200).json({
            email: userInfo.dataValues.email,
            name: userInfo.dataValues.name,
          });
        }
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
