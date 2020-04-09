const Server = require('../server');
const FoodService = require('../service/FoodService');

class FoodController {
    constructor() {
        Server.get('/food/type', this.getAllFoodTypes);
        Server.get('/food/type/:type', this.getAllFoodItemsByType);
        Server.get('/food/name/:name', this.getFoodInfoByName);
        Server.get('/food/:uid', this.getAllMealsCreatedByUser);
        Server.post('/food/:uid', this.createMeal);
        Server.put('/food/:uid/:mid', this.editMeal);
        Server.delete('/food/:uid/:mid', this.deleteMeal);
    }

    async createMeal(req, res) {
        const { uid } = req.params;
        const { meal } = req.body;
        try {
            const response = await FoodService.createMeal(uid, meal);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async editMeal(req, res) {
        const { uid, mid } = req.params;
        const { meal } = req.body;
        try {
            const response = await FoodService.editMeal(uid, mid, meal);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async deleteMeal(req, res) {
        const { uid, mid } = req.params;
        try {
            const response = await FoodService.deleteMeal(uid, mid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllMealsCreatedByUser(req, res) {
        const { uid } = req.params;
        try {
            const response = await FoodService.getAllMealsCreatedByUser(uid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllFoodTypes(req, res) {
        try {
            const response = await FoodService.getAllFoodTypes();
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllFoodItemsByType(req, res) {
        const { type } = req.params;
        try {
            const response = await FoodService.getAllFoodItemsByType(type);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getFoodInfoByName(req, res) {
        const { name } = req.params;
        try {
            const response = await FoodService.getFoodInfoByName(name);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new FoodController();