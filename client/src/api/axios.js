import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const instance = axios.create({
    baseURL: BASE_URL
})


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL
})


export default instance