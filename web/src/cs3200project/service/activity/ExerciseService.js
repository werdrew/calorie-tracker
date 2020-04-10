import axios from 'axios';

export default class ExerciseService {
    constructor() {
        this.BASE_URL = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`
    }

    async createExercise(id, exercise) {
        const response = await axios
            .post(this.BASE_URL + `/exercise/${id}`, {
                exercise
            })
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async editExercise(id, exercise) {
        const response = await axios
            .put(this.BASE_URL + `/exercise/${id}/${exercise.id}`, {
                exercise
            })
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async deleteExercise(id, exerciseId) {
        const response = await axios
            .delete(this.BASE_URL + `/exercise/${id}/${exerciseId}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllExercisesCreatedByUser(uid) {
        const response = await axios.get(this.BASE_URL + `/exercise/${uid}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        console.log(response);
        return response.data;
    }
    
    async getExerciseInfo(eid) {
        const response = await axios
            .get(this.BASE_URL + `/exercise/info/${eid}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllExerciseTypes() {
        const response = await axios
            .get(this.BASE_URL + '/exercise/type')
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }

    async getAllExerciseItemsByType(type) {
        const response = await axios
            .get(this.BASE_URL + `/exercise/type/${type}`)
            .then(res => { return res; })
            .catch(e => console.log(e));
        return response.data;
    }
}