const { User } = require('../models/user.model');

const createUSer = async function(data) {
    return User.create(data);
}

const listUsers = async function() {
    return User.find({})
        
}
const getUserById = async function(id) {
    return User.findById(id);
}

module.exports = {
    createUSer,
    listUsers,
    getUserById
};