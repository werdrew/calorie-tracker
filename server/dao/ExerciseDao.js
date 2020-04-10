const mysql = require('mysql');

class ExerciseDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createExercise(exercise) {
        const sql = `
INSERT INTO exercise (name, type_id)
VALUES (?, ?)
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                exercise.name,
                exercise.type
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async editExercise(uid, eid, exercise) {
        const sql = `
UPDATE exercise
SET name = ?, type_id = ?
WHERE id = ?;
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                exercise.name,
                exercise.type,
                eid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async deleteExercise(eid) {
        const sql = `
DELETE FROM exercise WHERE id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                eid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, id: results.insertId });
                }
            })
        });
    }

    async getAllExerciseItemsByType(tid, type) {
        const sql = `
SELECT id, name, "${type}" AS type FROM exercise WHERE type_id = ?
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                tid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ items: results });
                }
            })
        });
    }

    async getAllExercisesCreatedByUser(eids) {
        const sql = `
SELECT id, name, type_id 
FROM exercise
WHERE id IN (?);
`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [
                eids
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ success: true, exercises: results });
                }
            })
        });
    }
}

module.exports = new ExerciseDao();