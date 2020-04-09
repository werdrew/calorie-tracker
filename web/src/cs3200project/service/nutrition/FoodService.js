import axios from 'axios';

export default class FoodService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async createFood(food) {
        const response = await axios.post(this.BASE_URL + '/food', food)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async updateFood() {

    }

    async deleteFood() {

    }

    async getFoodInfoByName(name) {
        const response = await axios
            .get(this.BASE_URL + `/food/name/${name}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllFoodTypes() {
        const response = await axios
            .get(this.BASE_URL + '/food/type')
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllFoodItemsByType(type) {
        const response = await axios
            .get(this.BASE_URL + `/food/type/${type}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    // async createFoodEntry(foodEntry) {
    //     const response = await axios
    //         .post(this.BASE_URL + '/food', foodEntry)
    //         .then(res => { return res; })
    //         .catch(e => console.log(e));
    //     return response.data;
    // }
}
