const Server = require('../server');
const UserService = require('../service/UserService');

class UserController {
    constructor() {
        Server.post('/login', this.login);
        Server.post('/register', this.register);
    }

    async login(req, res) {
        const { username, password } = req.body;
        /* TODO: Parameter validation here, if any. */
        try {
            await UserService.login(username, password, res);
        } catch (e) {
            console.error(`Failed to log in (back-end)! ${e.message}`);
            res.send({ success: false });
        }
    }

    async register(req, res) {
        const { username, password, sex, month, day, year, height, weight } = req.body;
        /* TODO: Parameter validation here, if any. */
        try {
            await UserService.register(username, password, sex, month, day, year, height, weight, res);
        }
        catch (e) {
            console.error(`Failed to register user (back-end)! ${e.message}`);
            res.send({ success: false });
        }
    }
}

module.exports = new UserController();