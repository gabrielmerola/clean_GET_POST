import axios from "axios";

const api = axios.create({
    baseURL: "https://www.gmerola.com.br/ap/api"
});

export { api };