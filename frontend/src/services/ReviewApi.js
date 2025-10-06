import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export const addReviewApi = (bookId, data, token) =>{
  return axios.post(`${API_URL}/review/add-review/${bookId}`,data,
    {
       headers: {
          Authorization: `Bearer ${token}`,
        },
    }
  )
}