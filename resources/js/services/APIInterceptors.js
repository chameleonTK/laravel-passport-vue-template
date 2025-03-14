import axiosInstance from "./API";
import StorageService from "./StorageService";
import AuthService from "./AuthService";
import router from '../Routes'

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (_.includes(["auth/login", "auth/refresh-token"], config.url)) {
                return config;
            }

            const token = StorageService.get('access_token');
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
                // config.headers["x-access-token"] = token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (!_.includes(["auth/login", "auth/refresh-token"], originalConfig.url) && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        
                        const rs = await axiosInstance.post("auth/refresh-token", {
                            "grant_type": "refresh_token",
                            "client_id": CLIENT_ID,
                            "client_secret": CLIENT_SECRET,
                            "refresh_token": StorageService.get('refresh_token'),
                        });

                        const accessToken = rs?.data || {};
                        // store.dispatch('auth/refreshToken', accessToken);
                        StorageService.add('access_token', accessToken?.access_token);
                        StorageService.add('refresh_token', accessToken?.refresh_token);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        AuthService.removeToken();
                        router.push({name: "Login"});
                        return Promise.reject(err);
                    }
                }

                if (err.response.status === 404) {
                    // router.push('/404');
                    return Promise.reject(err);
                }

                if (err.response.status === 403) {
                    // router.push('/403');
                    return Promise.reject(err);
                }
            }

            
            return Promise.reject(err);
        }
    );
};

export default setup;