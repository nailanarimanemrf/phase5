import axios from 'axios'

// URL de base de ton backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // adapte si ton backend est sur un autre port
})

// Fonction pour définir le token dans les headers Authorization
export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

export default API
