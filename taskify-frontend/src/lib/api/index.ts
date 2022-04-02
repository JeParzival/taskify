import axios from "axios";

const ApiInstance = axios.create({
    baseURL: "http://localhost:5000"
});

export default ApiInstance;
