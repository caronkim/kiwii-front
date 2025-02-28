import api from "./api";

export async function getKimantleTrials(userId) {
    let params = new URLSearchParams({
        uuid: userId
    })
    return api.get(`/api/kimantle?${params.toString()}`, {}).then((response) => {
        return response.data
    });
}


export async function postKimantleTrial(userId, userWord) {
    return api.post(`/api/kimantle`, {
        uuid: userId,
        word: userWord
    }).then((response) => {
        console.log(response)
        return response.data
    });
}