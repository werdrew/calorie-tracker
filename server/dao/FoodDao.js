const mysql = require('mysql');

class FoodDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createMeal(food) {
        const sql = `
INSERT INTO FOOD (name, type_id, grams_per_serving, calories_per_100g)
VALUES (?, ?, ?, ?)
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                food.name,
                food.type,
                food.gramsPerServing,
                food.caloriesPer100G
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async editMeal(uid, mid, meal) {
        const sql = `
UPDATE food
SET name = ?, type_id = ?, grams_per_serving = ?, calories_per_100g = ?
WHERE id = ?;
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                meal.name,
                meal.type,
                meal.gramsPerServing,
                meal.caloriesPer100G,
                mid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async deleteMeal(mid) {
        const sql = `
DELETE FROM food WHERE id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                mid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async getAllFoodItemsByType(type) {
        const sql = `
SELECT name, "${type}" AS type, grams_per_serving, calories_per_100g FROM food WHERE type_id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [type], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ items: results });
                }
            })
        });
    }

    async getFoodInfoByName(name) {
        const sql = `SELECT id, grams_per_serving, calories_per_100g FROM food WHERE name = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [name], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ info: results[0] });
                }
            })
        });
    }

    async getAllMealsCreatedByUser(fids) {
        const sql = `
SELECT id, name, type_id, grams_per_serving, calories_per_100g 
FROM food
WHERE id IN (?);
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                fids
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, meals: results });
                }
            })
        });
    }
}

module.exports = new FoodDao();