import axios from 'axios';

export default class FoodLogService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async createFoodLogEntry(foodLogEntry) {
        const response = await axios
            .post(this.BASE_URL + '/food/log', foodLogEntry)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async editFoodLogEntry(foodLogEntry) {
        const response = await axios
            .put(this.BASE_URL + `/food/log/${foodLogEntry.user_id}/${foodLogEntry.date}/${foodLogEntry.food_id}`, foodLogEntry)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async deleteFoodLogEntry(foodLogEntry) {
        const response = await axios
            .delete(this.BASE_URL + `/food/log/${foodLogEntry.user_id}/${foodLogEntry.date}/${foodLogEntry.food_id}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getLogsForDate(id, date) {
        const response = await axios
            .get(this.BASE_URL + `/food/log/${id}/${date}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getTotalCaloriesForDate(id, date) {
        const response = await axios
            .get(this.BASE_URL + `/food/log/${id}/${date}/sum`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }
}
