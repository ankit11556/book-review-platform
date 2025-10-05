import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const  getAllBooksApi = async (pageNumber, ) => {
  return axios(`${API_URL}/book?page=${pageNumber}&limit=5`,
  )
} 