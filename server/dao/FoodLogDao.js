const mysql = require('mysql');

class FoodLogDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createFoodLogEntry(foodLogEntry) {
        const sql = `
INSERT INTO cs3200_project.food_log (user_id, food_id, date, num_servings, num_grams)
VALUES (?, ?, STR_TO_DATE(?, '%m-%e-%Y'), ?, ?)`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                foodLogEntry.user_id,
                foodLogEntry.food_id,
                foodLogEntry.date,
                foodLogEntry.num_servings,
                foodLogEntry.num_grams
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });
    }

    async editFoodLogEntry(uid, date, fid, foodLogEntry) {
        const fieldToUpdate = foodLogEntry.num_servings ? 'num_servings' : 'num_grams';
        const fieldToNull = foodLogEntry.num_servings ? 'num_grams' : 'num_servings';
        const sql = `
UPDATE food_log
SET ${fieldToUpdate} = ?, ${fieldToNull} = ?
WHERE user_id = ?
AND food_id = ?
AND date = STR_TO_DATE(?, '%Y-%m-%e')`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                foodLogEntry[fieldToUpdate],
                null,
                uid,
                fid,
                date
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
              }
            })
        });
    }

    async deleteFoodLogEntry(uid, date, fid) {
        const sql = `
DELETE FROM food_log
WHERE user_id = ?
AND food_id = ?
AND date = STR_TO_DATE(?, '%Y-%m-%e')`;
        console.log(uid, date, fid);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid,
                fid,
                date
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });
    }

    async getLogsForDate(id, date) {
        const sql = `
SELECT food_log.user_id, food_log.food_id, food_log.date, f.name, food_log.num_servings, food_log.num_grams, food_log.calories_gained
FROM food_log 
JOIN food f
ON food_log.food_id = f.id
JOIN user u
ON food_log.user_id = u.id
AND food_log.user_id = ?
AND date = STR_TO_DATE(?, '%m-%e-%Y');`
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                id,
                date
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, rows: results });
                }
            })
        });
    }

    async getTotalCaloriesForDate(id, date) {
        const sql = `
SELECT sum(food_log.calories_gained) AS cals
FROM food_log 
JOIN food f
ON food_log.food_id = f.id
JOIN user u
ON food_log.user_id = u.id
AND food_log.user_id = ?
AND date = STR_TO_DATE(?, '%m-%e-%Y');`
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                id,
                date
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, calories: results[0].cals });
                }
            })
        });
    }
}


module.exports = new FoodLogDao();