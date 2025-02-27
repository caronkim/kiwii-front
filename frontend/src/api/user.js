import api from "./api";

export async function signup(username, password) {
    let body = {
        username: username,
        password: password,
        accountId: "temp"
    };
    return api.post("/api/user/register", body).then((response) => {
        return response.data
    });
}

export async function login(username, password) {
    let body = {
        username: username,
        password: password
    }
    return api.post("/api/user/login", body).then((response) => {
        return response.data
    });
}

export async function getMyInfo() {
    return api.get("/api/user/information").then((response) => {
        return response.data;
    })
}