const mysql = require('mysql');

class UserDao {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }
    
    async login(username, password, res) {
        const sql = `SELECT username, password FROM user WHERE username = ?`;
        // return new Promise((resolve, reject) => {
        //         this.connection.query(sql, [username], (error, results, fields) => {
        //         if (error) resolve(false);
        //         else {
        //             const storedPassword = results[0] && results[0].password;
        //             resolve(password === storedPassword);
        //         }
        //     });
        // });
        this.connection.query(sql, [username], (error, results, fields) => {
                this.connection.query(sql, [username], (error, results, fields) => {
                if (error) res.send({ success: false });
                else {
                    const storedPassword = results[0] && results[0].password;
                    res.send({ success: password === storedPassword });
                }
            });
        });
    }
}

module.exports = new UserDao();