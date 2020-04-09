const Server = require('../server');
const FoodService = require('../service/FoodService');

class FoodController {
    constructor() {
        Server.get('/food/type', this.getAllFoodTypes);
        Server.get('/food/type/:type', this.getAllFoodItemsByType);
        Server.get('/food/name/:name', this.getFoodInfoByName);
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