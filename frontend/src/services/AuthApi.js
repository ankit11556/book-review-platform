import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const signUpApi = async (data) => {
 return axios.post(`${API_URL}/auth/sign-up`,data) 
}

export const loginApi = async (data) => {
  return axios.post(`${API_URL}/auth/login`,data)
}