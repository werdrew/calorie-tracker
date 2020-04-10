const ExerciseLogDao = require('../dao/ExerciseLogDao');

class ExerciseLogService {
    async createExerciseLogEntry(exerciseLogEntry) {
        try {
            return await ExerciseLogDao.createExerciseLogEntry(exerciseLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async editExerciseLogEntry(uid, date, eid, exerciseLogEntry) {
        try {
            const formattedDate = date.substring(0,10)
            return await ExerciseLogDao.editExerciseLogEntry(uid, formattedDate, eid, exerciseLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async deleteExerciseLogEntry(uid, date, eid) {
        try {
            const formattedDate = date.substring(0,10)
            return await ExerciseLogDao.deleteExerciseLogEntry(uid, formattedDate, eid);
        } catch(e) {
            throw e;
        }
    }

    async createExerciseLogEntry(exerciseLogEntry) {
        try {
            return await ExerciseLogDao.createExerciseLogEntry(exerciseLogEntry);
        } catch(e) {
            throw e;
        }
    }

    async getLogsForDate(id, date) {
        try {
            return await ExerciseLogDao.getLogsForDate(id, date);
        } catch(e) {
            throw e;
        }
    }

    async getTotalCaloriesForDate(id, date) {
        try {
            return await ExerciseLogDao.getTotalCaloriesForDate(id, date);
        } catch(e) {
            throw e;
        }
    }
}

module.exports = new ExerciseLogService();