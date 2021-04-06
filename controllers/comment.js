const { User, Post } = require('../models');

module.exports = {
    get: async (req, res) => {

    },
    post: async (req, res) => {
        console.log('req.body', req.body) // { writer: 'test', comment: '123' }
    },
    patch: async (req, res) => {

    }
}