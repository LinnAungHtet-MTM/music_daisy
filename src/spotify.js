import axios from "axios";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CLIENT_ID = '567bb88db01d4c369aec048005d7d72c';
const REDIRECT_URI = 'http://localhost:5173';
const SCOPES = ['user-library-read', 'playlist-read-private', 'user-top-read', 'user-read-recently-played'];
const RESPONSE_TYPE = 'token';

export const loginEndPoint = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}`;

const apiClient = axios.create({
    baseURL: "/api/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    })
}

export default apiClient;