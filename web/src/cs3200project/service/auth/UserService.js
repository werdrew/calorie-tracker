import axios from 'axios';

export default class UserService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async login(username, password) {
        // const res = false;
        const response = await axios
            .post(this.BASE_URL + '/login', {
                username,
                password
            })
            .then(res => {
                return res;
            })
            .catch(e => {
                console.log(`Error logging in (front-end!): ${e.message}`)
            })
        return response.data;
    }
}
