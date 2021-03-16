const Board = require('../schemas/board');

module.exports = {
    get: async(req, res, next) => {
    try {
      // const boards = await Board.find({});
      console.log('req.params',req.params)
      res.json(req.params);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  post: async(req, res, next) => {
    try {
      const board = await Board.create({
        writer: req.body.name,
        comment: req.body.age,
        createdAt: req.body.married,
      });
      console.log(board);
      res.status(201).json(board);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },  
  patch: async(req, res, next) => {

  },
  delete: async(req, res, next) => {

  }
}