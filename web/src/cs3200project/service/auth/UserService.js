import axios from 'axios';

export default class UserService {
    constructor() {
        this.BASE_URL = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    }

    async login(username, password) {
        try {
            await axios.post(this.base_URL + '/login', {
                username,
                password
            });
        } catch (e) {
            throw e;
        }
    }
}