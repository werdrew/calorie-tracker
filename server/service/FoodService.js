const FoodDao = require('../dao/FoodDao');
const FoodTypeDao = require('../dao/FoodTypeDao');
const UserFoodDao = require ('../dao/UserFoodDao.js')

class FoodService {
    async createMeal(uid, meal) {
        try {
            const type = meal.type;
            const row = await FoodTypeDao.getTypeIdByType(type);
            let result;
            if (!row.id) {
                result = await FoodTypeDao.createFoodType(type);
                meal.type = result.id;
            } else {
                meal.type = row.id;
            }
            const newMeal = await FoodDao.createMeal(meal);
            const fid = newMeal.id;
            return await UserFoodDao.mapUserToMeal(uid, fid);
        } catch(e) {
            throw e;
        }
    }

    async editMeal(uid, mid, meal) {
        try {
            const type = meal.type;
            const row = await FoodTypeDao.getTypeIdByType(type);
            let result;
            console.log(row);
            if (!row.id) {
                result = await FoodTypeDao.createFoodType(type);
                console.log(result);
                meal.type = result.id;
            } else {
                meal.type = row.id;
            }
            return await FoodDao.editMeal(uid, mid, meal);
        } catch(e) {
            throw e;
        }
    }

    async deleteMeal(uid, mid) {
        try {
            await UserFoodDao.deleteMeal(uid, mid);
            return await FoodDao.deleteMeal(mid);
        } catch(e) {
            throw e;
        }
    }

    async getAllMealsCreatedByUser(uid) {
        try {
            const data = await UserFoodDao.getAllMealsCreatedByUser(uid);
            if (data.foodIds.length > 0) {
                const rows = await FoodDao.getAllMealsCreatedByUser(data.foodIds.map(rowData => rowData['food_id']));
                return rows.meals;
            } else {
                return [];
            }
        } catch(e) {
            throw e;
        }
    }

    async getAllFoodTypes() {
        try {
            return await FoodTypeDao.getAllFoodTypes();
        } catch(e) {
            throw e;
        }
    }

    async getAllFoodItemsByType(type) {
        try {
            const data = await FoodTypeDao.getTypeIdByType(type);
            return await FoodDao.getAllFoodItemsByType(data.id, type);
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