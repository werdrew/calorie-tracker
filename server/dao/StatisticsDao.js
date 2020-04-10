const mysql = require('mysql');

class StatisticsDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }

    async getNetCaloriesForToday(uid, date) {
        const sql = `CALL calculate_net_calories_today(STR_TO_DATE(?, '%Y-%m-%e'), ?);`;
        return new Promise((resolve, reject) => {
            const query = this.connection.query(sql, [
                date,
                uid
            ], (error, results, fields) => {
                if (error) reject(error)
                else {
                    console.log(results)
                    resolve({ netCalories: results[0][0].net_cals });
                }
            })
            return query;
        });
    }
}

module.exports = new StatisticsDao();