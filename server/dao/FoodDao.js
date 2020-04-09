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
INSERT INTO FOOD (name, type, grams_per_serving, calories_per_100g)
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
        console.log(meal);
        const sql = `
UPDATE food
SET name = ?, type = ?, grams_per_serving = ?, calories_per_100g = ?
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

    async getAllFoodTypes() {
        const sql = `SELECT DISTINCT type FROM food;`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ types: results.map(result => result.type)});
                }
            })
        });
    }

    async getAllFoodItemsByType(type) {
        const sql = `SELECT name, type, grams_per_serving, calories_per_100g FROM food WHERE type = ?`;
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
        console.log(fids);
        const sql = `
SELECT id, name, type, grams_per_serving, calories_per_100g 
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