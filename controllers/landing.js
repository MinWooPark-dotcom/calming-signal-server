module.exports = {
    get: async (req, res, next) => {
    try {
      res.json({test: 'test landing'});
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}