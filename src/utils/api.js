import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_BASE_API_URL_AUTH_TOKEN}`,
    },
})

// response interceptors
axiosInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default axiosInstance
