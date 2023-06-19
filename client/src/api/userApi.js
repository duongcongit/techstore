import axios from "./axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const removeTokens = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
}

export const loginApi = (login, password) => {
    return axios.post('/auth/login', { username: login, password: password });
}

export const registerApi = (
    username,
    fullname,
    email,
    phone,
    address,
    password
) => {
    return axios.post('/auth/register', {
        username: username,
        password: password,
        email: email,
        phone: phone,
        address: address,
        password: password
    });
}
