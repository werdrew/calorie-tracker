const FoodDao = require('../dao/FoodDao');

class FoodService {
    async createFood(food) {
        try {
            return await FoodDao.createFood(food);
        } catch(e) {
            throw e;
        }
    }

    async getAllFoodTypes() {
        try {
            return await FoodDao.getAllFoodTypes();
        } catch(e) {
            throw e;
        }
    }

    async getAllFoodItemsByType(type) {
        try {
            return await FoodDao.getAllFoodItemsByType(type);
        } catch(e) {
            throw e;
        }
    }

    async getFoodInfoByName(name) {
        try {
            return await FoodDao.getFoodInfoByName(name);
        } catch(e) {
            throw e;
        }
    }
}

module.exports = new FoodService();