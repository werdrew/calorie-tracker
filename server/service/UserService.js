const UserDao = require('../dao/UserDao');

class UserService {
    async login(username, password, res) {
        /* TODO: Data validation here, if any. */
        try {
            await UserDao.login(username, password, res);
        } catch (e) {
            throw e;
        }
    }

    async register(username, password, sex, month, day, year, height, weight, res) {
        /* TODO: Data validation here, if any. */
        const dob = `${year}-${month}-${day}`;
        try {
            await UserDao.register(username, password, sex, dob, height, weight, res);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService();