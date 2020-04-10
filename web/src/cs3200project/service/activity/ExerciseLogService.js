import axios from 'axios';

export default class ExerciseLogService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async createExerciseLogEntry(uid, exerciseLogEntry) {
        const response = await axios
            .post(this.BASE_URL + `/exercise/log/${uid}`, exerciseLogEntry)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async editExerciseLogEntry(exerciseLogEntry) {
        const response = await axios
            .put(this.BASE_URL + `/exercise/log/${exerciseLogEntry.user_id}/${exerciseLogEntry.date}/${exerciseLogEntry.exercise_id}`, exerciseLogEntry)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async deleteExerciseLogEntry(exerciseLogEntry) {
        const response = await axios
            .delete(this.BASE_URL + `/exercise/log/${exerciseLogEntry.user_id}/${exerciseLogEntry.date}/${exerciseLogEntry.exercise_id}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getLogsForDate(id, date) {
        const response = await axios
            .get(this.BASE_URL + `/exercise/log/${id}/${date}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getTotalCaloriesForDate(id, date) {
        const response = await axios
            .get(this.BASE_URL + `/exercise/log/${id}/${date}/sum`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

}