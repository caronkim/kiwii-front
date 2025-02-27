import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

export default api;
