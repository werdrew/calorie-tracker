const StatisticsDao = require('../dao/StatisticsDao');

class StatisticsService {
    async getNetCaloriesForToday(uid, date) {
        try {
            return await StatisticsDao.getNetCaloriesForToday(uid, date);
        } catch(e) {
            throw e;
        }
    }
}

module.exports = new StatisticsService();