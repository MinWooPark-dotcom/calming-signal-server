const User = require('../schemas/user');

module.exports = {
  post: async (req, res, next) => {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });
      if (user) {
          res.status(201).json({
              message: 'Ok'
          });
      } else {
        res.status(400).json({
            message: 'Bad request'
      })
    } 
}  catch (err) {
      console.error(err);
      next(err);
    }
  }  
}