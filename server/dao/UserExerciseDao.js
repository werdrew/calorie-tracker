const mysql = require('mysql');

class UserExerciseDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async mapUserToExercise(uid, fid) {
        const sql = `
INSERT INTO user_exercise (user_id, exercise_id)
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

    async deleteExercise(uid, mid) {
        const sql = `
DELETE FROM user_exercise
WHERE user_id = ?
AND exercise_id = ?
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

    async getAllExercisesCreatedByUser(uid) {
        const sql = `
SELECT exercise_id
FROM user_exercise
WHERE user_id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                uid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, exerciseIds: results });
                }
            })
        });
    }

}

module.exports = new UserExerciseDao();