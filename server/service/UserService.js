const UserDao = require('../dao/UserDao');

class UserService {
    async getUser(username) {
        try {
            const userInfo = await UserDao.getUser(username);
            const success = userInfo.success;
            let results = userInfo.results;
            const dobComponents = results.dob.toISOString().substring(0,10).split("-");
            const [year, month, day] = dobComponents;
            delete results.dob;
            results = { ...results, year, month, day };
            return { success, results };
        } catch (e) {
            throw e;
        }
    }

    async updateUser(user) {
        try {
            let updatedUser = { ...user };
            const { year, month, day } = updatedUser;
            const dob = `${year}-${month}-${day}`;
            delete updatedUser.year;
            delete updatedUser.month;
            delete updatedUser.day;
            updatedUser = { ...updatedUser, dob };
            return await UserDao.updateUser(updatedUser);
        } catch (e) {
            throw e;
        }
    }

    async login(username, password) {
        /* TODO: Data validation here, if any. */
        try {
            return await UserDao.login(username, password);
        } catch (e) {
            throw e;
        }
    }

    async register(username, password, sex, month, day, year, height, weight) {
        /* TODO: Data validation here, if any. */
        const dob = `${year}-${month}-${day}`;
        try {
            return await UserDao.register(username, password, sex, dob, height, weight);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService();