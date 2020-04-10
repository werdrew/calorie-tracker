const Server = require('../server');
const ExerciseService = require('../service/ExerciseService');

class ExerciseController {
    constructor() {
        Server.get('/exercise/type', this.getAllExerciseTypes);
        Server.get('/exercise/type/:type', this.getAllExerciseItemsByType);
        Server.get('/exercise/info/:eid', this.getExerciseInfo);
        Server.get('/exercise/:uid', this.getAllExercisesCreatedByUser);
        Server.post('/exercise/:uid', this.createExercise);
        Server.put('/exercise/:uid/:eid', this.editExercise);
        Server.delete('/exercise/:uid/:eid', this.deleteExercise);
    }

    async createExercise(req, res) {
        const { uid } = req.params;
        const { exercise } = req.body;
        try {
            const response = await ExerciseService.createExercise(uid, exercise);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async editExercise(req, res) {
        const { uid, eid } = req.params;
        const { exercise } = req.body;
        try {
            const response = await ExerciseService.editExercise(uid, eid, exercise);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async deleteExercise(req, res) {
        const { uid, eid } = req.params;
        try {
            const response = await ExerciseService.deleteExercise(uid, eid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllExercisesCreatedByUser(req, res) {
        const { uid } = req.params;
        try {
            const response = await ExerciseService.getAllExercisesCreatedByUser(uid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllExerciseTypes(req, res) {
        try {
            const response = await ExerciseService.getAllExerciseTypes();
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getAllExerciseItemsByType(req, res) {
        const { type } = req.params;
        try {
            const response = await ExerciseService.getAllExerciseItemsByType(type);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }

    async getExerciseInfo(req, res) {
        const { eid } = req.params;
        try {
            const response = await ExerciseService.getExerciseInfo(eid);
            res.send(response);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new ExerciseController();