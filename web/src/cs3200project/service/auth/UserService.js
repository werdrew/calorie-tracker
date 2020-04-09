import axios from 'axios';

export default class UserService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async getUser(username) {
        const response = await axios
            .get(this.BASE_URL + `/user/${username}`)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.log(`Error getting use info (front-end!): ${e.message}`);
            });
        return response.data;
    }

    async updateUser(user) {
        const response = await axios
            .put(this.BASE_URL + `/user/${user.username}`, {
                user
            })
            .then(res => {
                return res;
            })
            .catch(e => {
                console.log(`Error updating user (front-end!): ${e.message}`);
            });
        return response.data;
    }

    async login(formData) {
        const response = await axios
            .post(this.BASE_URL + '/user/login', formData)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.log(`Error logging in (front-end!): ${e.message}`)
            });
        return response.data;
    }

    async register(formData) {
        const response = await axios
            .post(this.BASE_URL + '/user/register', formData)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.log(`Error registering (front-end!): ${e.message}`);
            });
        console.log(response);
        return response.data;
    }
}
