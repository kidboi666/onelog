import { API_CONFIG } from '@/src/config/index'
import axios from 'axios'

export const axiosInstance = axios.create(API_CONFIG)

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
