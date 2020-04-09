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

    async mapUserToMeal(uid, fid) {
        const sql = `
INSERT INTO user_food (user_id, food_id)
VALUES (?, ?);
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid,
                fid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });
    }

    async deleteMeal(uid, mid) {
        const sql = `
DELETE FROM user_food
WHERE user_id = ?
AND food_id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid,
                mid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });
    }

    async getAllMealsCreatedByUser(uid) {
        const sql = `
SELECT food_id
FROM user_food
WHERE user_id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, foodIds: results });
                }
            })
        });
    }
}

module.exports = new FoodDao();