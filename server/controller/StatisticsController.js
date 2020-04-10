const Server = require('../server');
const StatisticsService = require('../service/StatisticsService');

class StatisticsController {
    constructor() {
        Server.get('/statistics/calories/:uid/:date', this.getNetCaloriesForToday);
    }

    async getNetCaloriesForToday(req, res) {
        const { uid, date } = req.params;
        try {
            const response = await StatisticsService.getNetCaloriesForToday(uid, date);
            res.send(response);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new StatisticsController();