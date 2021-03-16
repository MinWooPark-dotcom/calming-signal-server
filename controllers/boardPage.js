const Board = require('../schemas/board');

module.exports = {
    get: async(req, res, next) => {
    try {
        console.log('req.query>>>',req.query)
    //   const boards = await Board.find({});
      res.json(req.query);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
}