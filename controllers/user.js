const User = require('../schemas/user');

module.exports = {
    get: async (req, res, next) => {
    try {
      const user = await User.find({});
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }  
}