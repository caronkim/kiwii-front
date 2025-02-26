import api from "./api";

let server = process.env.REACT_APP_SERVER_URL;

export async function getWordleQuiz() {
    return api.get(`/api/wordle-quizzes`).then((response) => {
        return response.data
    });
}

export async function getWordleTrials(userId, quizId) {
    let params = new URLSearchParams({
        userId: userId,
        quizId: quizId
    })
    return api.get(`/api/wordle-trials?${params.toString()}`, {}).then((response) => {
        return response.data
    });
}


export async function postWordleTrial(userId, quizId, characters) {
    return api.post(`/api/wordle-trials`, {
        userId: userId,
        quizId: quizId,
        characters: characters
    }).then((response) => {
        return response.data
    });
}