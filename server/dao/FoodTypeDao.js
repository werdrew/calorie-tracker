const mysql = require('mysql');

class FoodTypeDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async createFoodType(type) {
        const sql = `INSERT INTO food_type (type) VALUES (?);`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, type, (error, results, fields) => {
                if (error) reject(error)
                else {
                    resolve({ id: results.insertId });
                }
            })
        });
    }

    async getAllFoodTypes() {
        const sql = `SELECT DISTINCT type FROM food_type;`;
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
        const sql = `SELECT id FROM food_type WHERE type = ?;`;
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

module.exports = new FoodTypeDao();