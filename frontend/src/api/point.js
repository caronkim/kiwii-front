import api from "./api";

export async function getPointHistories() {
    return api.get(`/api/point/history`).then((response) => {
        return response.data;
    });
}