'use client'
import axios from "axios"

const axiosService = axios.create()

axiosService.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if(token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

export default axiosService