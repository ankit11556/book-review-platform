import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")

export const  getAllBooksApi = async (pageNumber, ) => {
  return axios.get(`${API_URL}/book?page=${pageNumber}&limit=5`,
  )
} 

export const addBookApi = async (data) => {
  return  axios.post(`${API_URL}/book/add-book`,data,
    {
       headers: {
       Authorization: `Bearer ${token}`,
        }
    }
  )
}

export const getBookDetailsApi = (id)=>{
  return axios.get(`${API_URL}/book/${id}`)
}