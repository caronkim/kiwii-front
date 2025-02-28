import api from "./api";

export async function postDrawStock() {
    return api.post(`/api/stock/give-random`, {}).then((response) => {
        return response.data
    });
}