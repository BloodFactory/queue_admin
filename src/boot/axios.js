import Vue      from 'vue';
import axios    from 'axios';
import security from "src/helpers/security";

const baseURL = process.env.API_BASE_URL;

const api = axios.create({
    baseURL
});

api.interceptors.request.use(config => {
    if (security.getToken()) {
        config.headers.Authorization = 'Bearer ' + security.getToken();
    }

    return config;
});

let isAlreadyRefreshing = false;
let refreshSubscribers  = [];

api.interceptors.response.use(response => response,
    error => {
        const status        = error.response.status;
        const originRequest = error.config;

        if (401 !== status) return Promise.reject(error);

        if (!isAlreadyRefreshing) {
            isAlreadyRefreshing = true;

            axios({
                baseURL,
                url: '/refresh_token',
                method: 'post',
                data: {
                    refreshToken: security.getRefreshToken()
                }
            }).then(response => {
                const {token, refreshToken} = response.data;

                security.setToken(token);
                security.setRefreshToken(refreshToken);

                refreshSubscribers.map(subscriber => {
                    subscriber(token);
                });
            }).catch((error) => {
                refreshSubscribers.map(subscriber => {
                    subscriber(false, error);
                });
            }).finally(() => {
                isAlreadyRefreshing = false;
                refreshSubscribers  = [];
            })
        }

        return new Promise((resolve, reject) => {
            refreshSubscribers.push((token, error = null) => {
                if (null !== error) {
                    reject(error);
                } else {
                    originRequest.headers.Authorization = 'Bearer ' + token;
                    axios(originRequest).then(response => resolve(response)).catch(error => reject(error));
                }
            })
        })
    })

Vue.prototype.$axios = axios;
Vue.prototype.$api   = api;

export {
    axios,
    api
};
