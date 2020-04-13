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

    async getUser(username) {
        const sql = `SELECT * FROM user WHERE username = ?`;
        return new Promise((resolve) => {
            this.connection.query(sql, [username], (error, results, fields) => {
                if (error) resolve({ success: false, err: `Error while getting user! ${error.message}`});
                else {
                    resolve({ success: true, results: results[0] });
                }
            });
        });
    }

    async updateUser(user) {
        const { sex, dob, height, weight, username } = user;
        const sql = `UPDATE user 
SET sex = ?, dob = ?, height = ?, weight = ?
WHERE username = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [sex, dob, height, weight, username], (error, results, fields) => {
                if (error) resolve({ success: false, err: `Error while updating user! ${error.message}`});
                else {
                    resolve({ success: true });
                }
            });
        });
    }
    
    async login(username, password) {
        const sql = `SELECT id, username, password FROM user WHERE username = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [username], (error, results, fields) => {
                if (error) resolve({ success: false, err: `Login error: Error while querying user for password!` });
                else {
                    const storedPassword = results[0] && results[0].password;
                    const id = results[0] && results[0].id;
                    resolve({ success: password === storedPassword, id });
                }
            });
        });
    }

    async register(username, password, sex, dob, height, weight) {
        const checkUsername = `SELECT username FROM user WHERE username = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(checkUsername, [username], (error, results, fields) => {
                if (error) {
                    resolve({ success: false, err: `Registration error: Error while checking username! ${error}` });
                }
                else if (results.length > 0) {
                    resolve({ success: false, err: `Regstration error: Username already exists!`});
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
                            resolve({ success: false, err: `Registration error: Error while creating user! ${error}` });
                        }
                        else {
                            resolve({ success: true, id: results.insertId });
                        }
                    });
                }
            });
        });
    }
}

module.exports = new UserDao();