const Server = require('../server');
const UserService = require('../service/UserService');

class UserController {
    constructor() {
        Server.get('/user/:username', this.getUser);
        Server.put('/user/:username', this.updateUser);
        Server.post('/user/login', this.login);
        Server.post('/user/register', this.register);
    }

    async getUser(req, res) {
        const { username } = req.params;
        try {
            const userInfo = await UserService.getUser(username, res);
            res.send(userInfo);
        } catch (e) {
            console.error(`Failed to get user (back-end!) ${e.message}`);
            res.send({ success: false, err: e.message });
        }
    }

    async updateUser(req, res) {
        const { username } = req.params;
        const { user } = req.body;
        if (username != user.username) {
            res.send({ success: false, err: 'Username doesn\'t match user being updated!' });
        }
        try {
            const status = await UserService.updateUser(user);
            res.send(status);
        } catch (e) {
            console.log(`Failed to update user (back-end)! ${e.message}`)
            res.send({ success: false, err: e.message })
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        /* TODO: Parameter validation here, if any. */
        try {
            const loggedIn = await UserService.login(username, password, res);
            res.send(loggedIn);
        } catch (e) {
            console.error(`Failed to log in (back-end)! ${e.message}`);
            res.send({ success: false, err: e.message });
        }
    }

    async register(req, res) {
        const { username, password, sex, month, day, year, height, weight } = req.body;
        /* TODO: Parameter validation here, if any. */
        try {
            const registered = await UserService
                .register(username, password, sex, month, day, year, height, weight, res);
            res.send(registered);
        }
        catch (e) {
            console.error(`Failed to register user (back-end)! ${e.message}`);
            res.send({ success: false, err: e.message });
        }
    }
}

module.exports = new UserController();