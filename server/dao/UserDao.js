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
        this.connection.query(sql, [username], (error, results, fields) => {
            if (error) res.send({ success: false, message: `Login error: Error while querying user for password!` });
            else {
                const storedPassword = results[0] && results[0].password;
                res.send({ success: password === storedPassword });
            }
        });
    }

    async register(username, password, sex, dob, height, weight, res) {
        console.log(username, password, sex, dob, height, weight);
        const checkUsername = `SELECT username FROM user WHERE username = ?`;
        this.connection.query(checkUsername, [username], (error, results, fields) => {
            if (error) {
                res.send({ success: false, message: `Registration error: Error while checking username! ${error}` });
            }
            else if (results.length > 0) {
                res.send({ success: false, message: `Regstration error: Username already exists!`});
            }
            else {
                const createUser = `INSERT INTO user SET username = ?, password = ?, sex = ?, dob = ?, height = ?, weight = ?`;
                this.connection.query(createUser, [
                    username,
                    password,
                    sex,
                    dob,
                    height,
                    weight
                 ], (error, results, fields) => {
                    if (error) {
                        res.send({ success: false, message: `Registration error: Error while creating user! ${error}` });
                    }
                    else {
                        res.send({ success: true });
                    }
                });
            }
        });
    }
}

module.exports = new UserDao();