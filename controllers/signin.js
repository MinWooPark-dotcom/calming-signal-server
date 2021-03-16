const User = require('../schemas/user');

module.exports = {
  post: async (req, res, next) => {
    try {
      const user = await User.find({
        email: req.body.email,
        password: req.body.password,
      });
      if (user) {
          res.status(201).json({
              message: 'Ok'
          });
      } else {
        res.status(404).json({
            message: 'Not found'
      })
    } 
}  catch (err) {
      console.error(err);
      next(err);
    }
  }  
}