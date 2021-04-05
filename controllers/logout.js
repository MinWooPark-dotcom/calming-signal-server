const { User } = require("../models");

module.exports = {
    post: async (req, res) => {
        req.session.destroy((err) => {
        // cannot access session here
        console.error('err',err)
        }) 

        res.status(205).json({
            message: "Logout completed",
        });
    }
}
