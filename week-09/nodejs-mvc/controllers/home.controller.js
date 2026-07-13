const UserService = require('../services/user.services');
const indexController = async (req, res) => {
    const users = await UserService.listUsers();
    
    res.render('index', { users: users });
};

const userDetailController = async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.render('userDetail', { user: user });
}

module.exports = { indexController, userDetailController }