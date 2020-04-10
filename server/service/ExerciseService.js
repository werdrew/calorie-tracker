const ExerciseDao = require('../dao/ExerciseDao');
const ExerciseTypeDao = require('../dao/ExerciseTypeDao');
const UserExerciseDao = require ('../dao/UserExerciseDao')
const CaloriesBurnedDao = require ('../dao/CaloriesBurnedDao');

class ExerciseService {
    async createExercise(uid, exercise) {
        try {
            const type = exercise.type;
            const row = await ExerciseTypeDao.getTypeIdByType(type);
            let result;
            if (!row.id) {
                result = await ExerciseTypeDao.createExerciseType(type);
                exercise.type = result.id;
            } else {
                exercise.type = row.id;
            }
            const newExercise = await ExerciseDao.createExercise(exercise);
            const eid = newExercise.id;
            await UserExerciseDao.mapUserToExercise(uid, eid);
            return await CaloriesBurnedDao.createEntry(eid, exercise);
        } catch(e) {
            throw e;
        }
    }

    async editExercise(uid, eid, exercise) {
        try {
            const type = exercise.type;
            const row = await ExerciseTypeDao.getTypeIdByType(type);
            let result;
            if (!row.id) {
                result = await ExerciseTypeDao.createExerciseType(type);
                exercise.type = result.id;
            } else {
                exercise.type = row.id;
            }
            await ExerciseDao.editExercise(uid, eid, exercise);
            return await CaloriesBurnedDao.editEntry(eid, exercise)
        } catch(e) {
            throw e;
        }
    }

    async deleteExercise(uid, eid) {
        try {
            await UserExerciseDao.deleteExercise(uid, eid);
            return await ExerciseDao.deleteExercise(eid);
        } catch(e) {
            throw e;
        }
    }

    async getAllExercisesCreatedByUser(uid) {
        try {
            const data = await UserExerciseDao.getAllExercisesCreatedByUser(uid);
            if (data.exerciseIds.length > 0) {
                const rows = await ExerciseDao.getAllExercisesCreatedByUser(data.exerciseIds.map(rowData => rowData['exercise_id']));
                return rows.exercises;
            } else {
                return [];
            }
        } catch(e) {
            throw e;
        }
    }

    async getAllExerciseTypes() {
        try {
            return await ExerciseTypeDao.getAllExerciseTypes();
        } catch(e) {
            throw e;
        }
    }

    async getAllExerciseItemsByType(type) {
        try {
            const data = await ExerciseTypeDao.getTypeIdByType(type);
            return await ExerciseDao.getAllExerciseItemsByType(data.id, type);
        } catch(e) {
            throw e;
        }
    }

    async getExerciseInfo(eid) {
        try {
            return await CaloriesBurnedDao.getEntry(eid);
        } catch(e) {
            throw e;
        }
    }
}

module.exports = new ExerciseService();