import axios from "axios";

const instance = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

export default instance;