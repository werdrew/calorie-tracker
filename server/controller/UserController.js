const Server = require('../server');
const UserService = require('../service/UserService');

class UserController {
    constructor() {
        Server.post('/login', this.login)
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            await UserService.login(username, password, res);
        } catch (e) {
            console.error(`Failed to log in (back-end)! ${e.message}`)
            return false;
        }
    }
}

module.exports = new UserController();