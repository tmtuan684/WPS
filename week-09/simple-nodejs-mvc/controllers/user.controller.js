const {User} = require('../models/user.model');

const index = async (req, res) => {
    const users = await User.find({});
    res.render('index', { users: users });
};

const userDetail = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.render('userDetail', { user: user });
}

module.exports = { index, userDetail }

