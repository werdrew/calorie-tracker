const Server = require('../server');
const ExerciseLogService = require('../service/ExerciseLogService');

class ExerciseLogController {
    constructor() {
        Server.post('/exercise/log/:uid', this.createExerciseLogEntry);
        Server.put('/exercise/log/:uid/:date/:eid', this.editExerciseLogEntry);
        Server.delete('/exercise/log/:uid/:date/:eid', this.deleteExerciseLogEntry);
        Server.get('/exercise/log/:id/:date', this.getLogsForDate);
        Server.get('/exercise/log/:id/:date/sum', this.getTotalCaloriesForDate);
    }

    async createExerciseLogEntry(req, res) {
        const exerciseLogEntry = req.body;
        try {
            const response = await ExerciseLogService.createExerciseLogEntry(exerciseLogEntry);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async editExerciseLogEntry(req, res) {
        const { uid, date, eid } = req.params;
        const exerciseLogEntry = req.body;
        try {
            const response = await ExerciseLogService.editExerciseLogEntry(uid, date, eid, exerciseLogEntry);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async deleteExerciseLogEntry(req, res) {
        console.log('I reached here')
        const { uid, date, eid } = req.params;
        try {
            const response = await ExerciseLogService.deleteExerciseLogEntry(uid, date, eid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getLogsForDate(req, res) {
        const { id, date } = req.params;
        try {
            const response = await ExerciseLogService.getLogsForDate(id, date);
            res.send(response);
        } catch (e) {
            console.log(e);
        }
    }

    async getTotalCaloriesForDate(req, res) {
        const { id, date } = req.params;
        try {
            const response = await ExerciseLogService.getTotalCaloriesForDate(id, date);
            res.send(response);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ExerciseLogController();