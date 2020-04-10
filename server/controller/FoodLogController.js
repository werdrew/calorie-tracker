const Server = require('../server');
const FoodLogService = require('../service/FoodLogService');

class FoodLogController {
    constructor() {
        Server.post('/food/log/:uid', this.createFoodLogEntry);
        Server.put('/food/log/:uid/:date/:fid', this.editFoodLogEntry);
        Server.delete('/food/log/:uid/:date/:fid', this.deleteFoodLogEntry);
        Server.get('/food/log/:id/:date', this.getLogsForDate);
        Server.get('/food/log/:id/:date/sum', this.getTotalCaloriesForDate);
    }

    async createFoodLogEntry(req, res) {
        const foodLogEntry = req.body;
        try {
            const response = await FoodLogService.createFoodLogEntry(foodLogEntry);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async editFoodLogEntry(req, res) {
        const { uid, date, fid } = req.params;
        const foodLogEntry = req.body;
        try {
            const response = await FoodLogService.editFoodLogEntry(uid, date, fid, foodLogEntry);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async deleteFoodLogEntry(req, res) {
        const { uid, date, fid } = req.params;
        try {
            const response = await FoodLogService.deleteFoodLogEntry(uid, date, fid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getLogsForDate(req, res) {
        const { id, date } = req.params;
        try {
            const response = await FoodLogService.getLogsForDate(id, date);
            res.send(response);
        } catch (e) {
            console.log(e);
        }
    }

    async getTotalCaloriesForDate(req, res) {
        const { id, date } = req.params;
        try {
            const response = await FoodLogService.getTotalCaloriesForDate(id, date);
            res.send(response);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new FoodLogController();