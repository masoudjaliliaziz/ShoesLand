import { BASE_URL, TIMEOUT } from '../../config/apiConfig';
import { ApiContext } from './../../component/base/Api';
import axios from "axios";



const http = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
})

const httpPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
})

httpPrivate.interceptors.request.use(function(config)){
    // Add a token to the request headers
    const tokern = ""
    config.headers.Authorization = `Bearer ${tokern}`

    return config
}

httpPrivate.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {

            return axios(error.config);
        }
        return Promise.reject(error);
    }
)

const HTTP = {
    get:http.get,
    post:http.post,
    put:http.put,
    delete:http.delete,
}