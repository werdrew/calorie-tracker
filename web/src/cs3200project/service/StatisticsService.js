import axios from 'axios';

export default class StatisticsService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async getNetCaloriesForToday(uid, date) {
        try {
            const response = await axios.get(this.BASE_URL + `/statistics/calories/${uid}/${date}`)
                .then(res => { return res; })
                .catch(e => console.log(e));
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}