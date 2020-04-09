import axios from 'axios';

export default class FoodService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async createMeal(id, meal) {
        const response = await axios
            .post(this.BASE_URL + `/food/${id}`, {
                meal
            })
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async editMeal(id, meal) {
        const response = await axios
            .put(this.BASE_URL + `/food/${id}/${meal.id}`, {
                meal
            })
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async deleteMeal(id, mealId) {
        const response = await axios
            .delete(this.BASE_URL + `/food/${id}/${mealId}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllMealsCreatedByUser(uid) {
        const response = await axios.get(this.BASE_URL + `/food/${uid}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
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
}
