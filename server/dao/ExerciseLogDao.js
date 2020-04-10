const mysql = require('mysql');

class ExerciseLogDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createExerciseLogEntry(exerciseLogEntry) {
        const sql = `
INSERT INTO cs3200_project.exercise_log (user_id, exercise_id, date, minutes_performed)
VALUES (?, ?, STR_TO_DATE(?, '%m-%e-%Y'), ?)`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                exerciseLogEntry.user_id,
                exerciseLogEntry.exercise_id,
                exerciseLogEntry.date,
                exerciseLogEntry.minutes_performed
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
                }
            })
        });
    }

    async editExerciseLogEntry(uid, date, eid, exerciseLogEntry) {
        const sql = `
UPDATE exercise_log
SET minutes_performed = ?
WHERE user_id = ?
AND exercise_id = ?
AND date = STR_TO_DATE(?, '%Y-%m-%e')`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                exerciseLogEntry.minutes_performed,
                uid,
                eid,
                date
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true });
              }
            })
        });
    }

    async deleteExerciseLogEntry(uid, date, eid) {
        const sql = `
DELETE FROM exercise_log
WHERE user_id = ?
AND exercise_id = ?
AND date = STR_TO_DATE(?, '%Y-%m-%e')`;
        console.log(uid, date, eid);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid,
                eid,
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
SELECT exercise_log.user_id, exercise_log.exercise_id, exercise_log.date, f.name, exercise_log.minutes_performed, exercise_log.calories_lost
FROM exercise_log 
JOIN exercise f
ON exercise_log.exercise_id = f.id
JOIN user u
ON exercise_log.user_id = u.id
AND exercise_log.user_id = ?
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
SELECT sum(exercise_log.calories_lost) AS cals
FROM exercise_log 
JOIN exercise f
ON exercise_log.exercise_id = f.id
JOIN user u
ON exercise_log.user_id = u.id
AND exercise_log.user_id = ?
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

module.exports = new ExerciseLogDao();