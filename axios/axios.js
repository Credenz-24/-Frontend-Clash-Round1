import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const axiosNoAuthInstance = axios.create({
    baseURL: API_URL,
});

const axiosAuthInstance = axios.create({
    baseURL: API_URL,
});

axiosAuthInstance.interceptors.request.use(
    (config) => {
        if(localStorage.getItem("token")){
            config.headers.Authorization = `token ${localStorage.getItem("token")}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {axiosAuthInstance, axiosNoAuthInstance};