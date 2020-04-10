const mysql = require('mysql');

class CaloriesBurnedDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createEntry(eid, exercise) {
        const sql = `
INSERT INTO calories_burned (exercise_id, at_130_lb, at_155_lb, at_180_lb, at_205_lb)
VALUES (?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                eid,
                exercise.calsBurnedAt130lb,
                exercise.calsBurnedAt155lb,
                exercise.calsBurnedAt180lb,
                exercise.calsBurnedAt205lb
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });

    }

    async editEntry(eid, exercise) {
        const sql = `
UPDATE calories_burned
SET at_130_lb = ?, at_155_lb = ?, at_180_lb = ?, at_205_lb = ?
WHERE exercise_id = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                exercise.calsBurnedAt130lb,
                exercise.calsBurnedAt155lb,
                exercise.calsBurnedAt180lb,
                exercise.calsBurnedAt205lb,
                eid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });

    }

    async getEntry(eid) {
        const sql = `
SELECT exercise_id, at_130_lb, at_155_lb, at_180_lb, at_205_lb
FROM calories_burned
WHERE exercise_id = ?;`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                eid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ entry: results[0] });
                }
            })
        });
    }
}

module.exports = new CaloriesBurnedDao();