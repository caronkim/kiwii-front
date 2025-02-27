import api from "./api";

export async function getTodayQuiz() {
    return api.get(`/api/dailyquiz/today-quiz`).then((response) => {
        return response.data
    });
}

export async function postTodayQuiz(answerCount) {
    let body = {
        correctAnswer: answerCount,
    }
    return api.post(`/api/dailyquiz/today-quiz`, body).then((response) => {
        return response.data
    });
}