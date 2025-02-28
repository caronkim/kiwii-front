import api from "./api";

export async function getStockUpDown() {
    return api.get(`/api/stock-up-down`).then((response) => {
        return response.data;
    });
}

export async function postPredictStockUpDown(trial) {
    let body = {
        trial: trial
    };
    return api.post(`/api/stock-up-down/predict`, body).then((response) => {
        return response.data;
    });
}