const FoodLogDao = require('../dao/FoodLogDao');

class FoodLogService {
    async createFoodLogEntry(foodLogEntry) {
        try {
            return await FoodLogDao.createFoodLogEntry(foodLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async editFoodLogEntry(uid, date, fid, foodLogEntry) {
        try {
            const formattedDate = date.substring(0,10)
            return await FoodLogDao.editFoodLogEntry(uid, formattedDate, fid, foodLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async deleteFoodLogEntry(uid, date, fid) {
        try {
            const formattedDate = date.substring(0,10)
            return await FoodLogDao.deleteFoodLogEntry(uid, formattedDate, fid);
        } catch(e) {
            throw e;
        }
    }

    async createFoodLogEntry(foodLogEntry) {
        try {
            return await FoodLogDao.createFoodLogEntry(foodLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async getLogsForDate(id, date) {
        try {
            return await FoodLogDao.getLogsForDate(id, date);
        } catch(e) {
            throw e;
        }
    }

    async getTotalCaloriesForDate(id, date) {
        try {
            return await FoodLogDao.getTotalCaloriesForDate(id, date);
        } catch(e) {
            throw e;
        }
    }
}

module.exports = new FoodLogService();