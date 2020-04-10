const mysql = require('mysql');

class ExerciseTypeDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createExerciseType(type) {
        const sql = `INSERT INTO exercise_type (type) VALUES (?);`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, type, (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ id: results.insertId });
                }
            })
        });
    }

    async getAllExerciseTypes() {
        const sql = `SELECT DISTINCT type FROM exercise_type;`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ types: results.map(result => result.type)});
                }
            })
        });
    }

    async getTypeIdByType(type) {
        const sql = `SELECT id FROM exercise_type WHERE type = ?;`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, type, (error, results, fields) => {
                if (error) reject(error)
                else {
                    if (results[0]) {
                        resolve({ id: results[0].id });
                    } else {
                        resolve({ id: undefined });
                    }
                }
            })
        });
    }

}

module.exports = new ExerciseTypeDao();