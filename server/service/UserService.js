const UserDao = require('../dao/UserDao');

class UserService {
    async login(username, password, res) {
        /* TODO: Data validation goes here if any. */
        try {
            return await UserDao.login(username, password, res);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService();